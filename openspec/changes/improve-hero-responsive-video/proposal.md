## Why

The homepage Hero breaks on mobile and small viewports:

1. **Arbitrary absolute positioning** — logo (`top-72 md:top-60 lg:top-44 xl:top-20`) and CTA (`bottom-64 lg:bottom-72`) are placed with per-breakpoint offsets independent of content, so they collide with the masked title at many resolutions.
2. **SVG text mask scales wrong** — the title lives in an SVG with `viewBox="0 0 1920 1080"` and `preserveAspectRatio="xMidYMid slice"`. On portrait/small screens the canvas is cropped and text scales with height, not width; `font-size: clamp()` inside SVG user space does not behave like normal CSS.
3. **`min-h-screen` (100vh)** includes mobile browser chrome, pushing bottom-anchored content off-screen.

Performance is equally broken:

- The same **36 MB WebM** (`public/toma aerea de miami webm.webm`) is decoded **twice simultaneously** (`BackgroundVideo.vue` + a second `<video>` inside `TextMask.vue`'s `foreignObject`).
- **No MP4/H.264 fallback** (iOS Safari WebM support is unreliable), **no poster**, `preload="auto"` — on mobile the hero sits on a black void while the file downloads.
- The title is client-only (`ClientOnly` + SVG text): **no `<h1>` is server-rendered**, hurting SEO.

Additional defects found while auditing:

- `assets/css/global.css` lines 32–89: an **orphaned `:root` block** (missing opening selector) — all those custom properties are dropped by the CSS parser.
- `.snap-container` uses `height: 100vh` (not `dvh`) on the homepage scroller.
- `app/pages/index.vue` gives Hero an `mt-24` hack that makes the snap section taller than the viewport.
- Unreferenced 23 MB duplicate asset: `public/toma aerea de miami webm1111111111111111.webm`.

## What Changes

- **Layout**: restructure Hero into a single centered flex column (logo → title → CTA) with `gap`, replacing all absolute per-breakpoint offsets. `min-h-svh` (with `min-h-screen` fallback) instead of `min-h-screen`; content clears the fixed header via `--header-height`.
- **Effect with one decode**: replace the SVG `TextMask` with a pure-CSS "knockout": ONE background video + a `mix-blend-multiply` dark layer whose white `<h1>` lets the video show through the letters. Delete `TextMask.vue`.
- **SEO/a11y**: real SSR `<h1>BUILT TO DELIVER</h1>` (`font-montserrat`, true CSS `clamp()` sizing).
- **Video delivery**: WebP poster painted instantly (CSS background + `poster` attribute); compressed H.264 MP4 + WebM sources (mobile 720p ≤ 2 MB, desktop 1080p ≤ 4 MB, `+faststart`, no audio); `preload="metadata"`; poster-only mode for `saveData`/slow connections and `prefers-reduced-motion`.
- **Related responsive fixes**: `.snap-container` `100vh → 100dvh` (keep `vh` fallback); remove `mt-24` on Hero in `app/pages/index.vue`; repair the orphaned `:root` block in `assets/css/global.css`.
- **Asset hygiene**: remove the unreferenced 23 MB duplicate (with user confirmation); new encodes use clean kebab-case names.

## Capabilities

### New Capabilities
- `hero-layout`: responsive, content-driven Hero layout (flex column, svh units, header clearance, SSR heading)
- `hero-video-performance`: single-decode video background with knockout title, poster-first loading, adaptive delivery

### Modified Capabilities
- *(none — `page-backgrounds` stays satisfied: the Hero `<section>` carries no background class; the fallback color lives on the inner media wrapper)*

## Scope

- Hero on `/` only: `app/components/hero/*`, `app/pages/index.vue` (Hero wrapper), `assets/css/global.css` (snap container + `:root` repair), new media assets in `public/`.
- **Workflow requirement**: all implementation happens on branch `fix/hero-responsive-video`, which must pass the full test matrix in `tasks.md` before any merge to `main`.

## Non-goals

- Header/nav changes (user confirmed it is acceptable; the 850px breakpoint stays untouched).
- Other sections' videos (Process cards, CompanyDescription timelapse) — the same optimization pattern can be applied in a later change.
- i18n, new copy, logo redesign.
- Deleting/moving the 36 MB master video without explicit user confirmation.

## Impact

- **Files modified**: `app/components/hero/Hero.vue`, `app/components/hero/TextWithVideo.vue`, `app/components/hero/BackgroundVideo.vue`, `app/pages/index.vue`, `assets/css/global.css`
- **Files deleted**: `app/components/hero/TextMask.vue`
- **Assets added**: `public/hero-miami-poster.webp`, `public/hero-miami-720.mp4`, `public/hero-miami-720.webm`, `public/hero-miami-1080.mp4`
- **Assets removed (pending confirmation)**: `public/toma aerea de miami webm1111111111111111.webm` (23 MB, unreferenced)
- **Dark mode**: unchanged — dark theme default; knockout layer uses `background-tertiary` (#2C2C2E), media fallback `background-secondary` (#1C1C1E), CTA keeps primary `#FF9F0A` gradient and `shadow-button-primary`-style 3D shadows
- **Architecture**: multi-page structure unaffected — Hero remains a component consumed by `app/pages/index.vue`
- **Dependencies**: none added permanently (ffmpeg via system package or `npx ffmpeg-static` for asset generation only)
