## Context

Current Hero stack (all under `app/components/hero/`):

- `Hero.vue` — `<section min-h-screen>` with `ClientOnly > TextWithVideo` as an absolute layer, plus absolutely-positioned `Logo` (top offsets per breakpoint) and `HeroButton` (bottom offsets per breakpoint).
- `TextWithVideo.vue` — `BackgroundVideo` + black gradient overlay + `TextMask`, wrapper `min-h-screen`.
- `BackgroundVideo.vue` — `<video autoplay muted loop playsinline preload="auto">` with a single WebM source (36 MB).
- `TextMask.vue` — SVG 1920×1080 `slice`, `clipPath` text (`font-size: clamp(4rem,4vw,5rem)` in user space), second `<video>` in `foreignObject` (same 36 MB file, brightness/saturate/contrast filters), white rect at 0.15 opacity.

Consumers: only `app/pages/index.vue` (Hero inside `.snap-section`, with `mt-24`). Homepage scroller: `.snap-container { height: 100vh; overflow-y: scroll; scroll-padding-top: var(--header-height) }` in `assets/css/global.css`. Header is fixed (`app/app.vue`), `--header-height: 120px` desktop / `60px` ≤850px. Tailwind 3.4.19 (supports `min-h-svh`, `isolate`, `mix-blend-multiply`).

Data flow: no JSON/composables involved — props only: `Hero (videoURL, title) → TextWithVideo (video, title) → BackgroundVideo (video)`. New: `poster` prop and adaptive source selection inside `BackgroundVideo`.

## Goals / Non-Goals

**Goals**
- Content-driven layout that never overlaps at any viewport (360px → 1920px, portrait and landscape).
- Keep the "video visible through the letters" brand effect with **one** video decode.
- Never show a black void: poster-first paint, brand-color fallback.
- Mobile-friendly weight (≤ 2 MB video on ≤850px), iOS-safe formats, polite loading on constrained connections.
- SSR `<h1>` for SEO.

**Non-Goals**
- Header/nav, other sections' videos, i18n, copy changes, logo redesign.

## Decisions

### 1. Layout: one shared flex column, rendered in two synchronized layers

All absolute per-breakpoint offsets are removed. A single class string (defined once in `Hero.vue` script, bound to both layers) drives layout:

```
columnClasses = "flex min-h-screen min-h-svh flex-col items-center justify-center gap-6 px-4 pb-16 pt-[calc(var(--header-height)+1rem)]"
```

Structure:

```html
<section id="home" class="relative w-full min-h-screen min-h-svh text-white">
  <!-- Media layer (absolute, blends internally) -->
  <div class="absolute inset-0 isolate overflow-hidden bg-background-secondary bg-cover bg-center"
       :style="{ backgroundImage: `url(${poster})` }">
    <ClientOnly><BackgroundVideo ... /></ClientOnly>   <!-- only the video is client-only -->
    <div :class="columnClasses" class="absolute inset-0 bg-background-tertiary mix-blend-multiply hero-knockout">
      <Logo class="invisible" aria-hidden="true" ... />          <!-- spacer: exact metrics -->
      <h1 class="text-white font-montserrat font-black tracking-tight text-center text-[clamp(2.5rem,8vw,6rem)]">
        BUILT TO DELIVER
      </h1>
      <HeroButton class="invisible" aria-hidden="true" ... />    <!-- spacer: exact metrics -->
    </div>
  </div>
  <!-- Content layer (normal, above media) -->
  <div :class="columnClasses" class="relative z-10">
    <Logo ... />
    <div aria-hidden="true" class="invisible font-montserrat font-black tracking-tight text-center text-[clamp(2.5rem,8vw,6rem)]">
      BUILT TO DELIVER
    </div>
    <HeroButton ... />
  </div>
</section>
```

Why two layers: `mix-blend-mode` applies to the whole rendered subtree, so logo/CTA cannot live inside the multiplied layer (they would be darkened/tinted by the video). The knockout layer therefore contains `visibility: hidden` twins of `Logo` and `HeroButton` (same components → identical metrics at every breakpoint, removed from a11y tree and tab order), while the content layer contains an invisible twin of the title. Both columns share `columnClasses` → guaranteed alignment with zero magic numbers. The real, crawlable `<h1>` is the one in the knockout layer (white text = the "hole").

- `min-h-screen` before `min-h-svh` = fallback for browsers without svh (iOS < 15.4).
- `isolate` on the media wrapper contains the blend so it never leaks into page content.
- `app/pages/index.vue`: remove `mt-24`; make the Hero `.snap-section` `flex flex-col` and Hero `flex-1` so it stretches to the snap section's `100dvh` instead of leaving a gap.
- The `<section>` gets **no** background class (keeps `page-backgrounds` spec satisfied); the fallback color lives on the inner media wrapper.

### 2. Knockout effect: multiply math, one decode

Layer order inside the isolated wrapper: poster/video backdrop → `bg-background-tertiary` (#2C2C2E ≈ 17% luminance) with `mix-blend-multiply` containing white text.

- Outside letters: `video × 0.17` → darkened video (tune darkness by changing the gray token).
- Inside letters: `video × 1.0` → full-brightness video through the glyphs.

This replaces the SVG mask + second video entirely. Text is plain HTML, so `clamp(2.5rem, 8vw, 6rem)` scales with viewport **width** correctly at every breakpoint. Before the video loads (or when it is disabled), the multiply blends against the poster CSS background — the effect works from first paint.

Fallback: `@supports not (mix-blend-mode: multiply)` → knockout layer becomes `background: rgba(0,0,0,0.6); mix-blend-mode: normal` with white title (plain title over darkened video/poster). Same visual result for `saveData`/reduced-motion users, since the poster is the backdrop.

Rejected alternatives:
- `background-clip: text` over a second video → two decodes again (the exact problem we're fixing).
- Keep SVG mask with one video via `mask` referencing the video → not possible in CSS/SVG without a second decode or canvas.
- JS-measured alignment of layers → fragile on resize/font-load; visibility-twins are deterministic.

### 3. Asset pipeline (ffmpeg)

Master: `public/toma aerea de miami webm.webm` (36 MB; probe duration/resolution first — ffprobe unavailable today, install ffmpeg or use `npx --yes ffmpeg-static`). If duration > 20s, trim to a 12–15s seamless loop (`-t 15`) — aerial footage loops well.

| Asset | Command sketch | Budget |
|---|---|---|
| `hero-miami-poster.webp` | `-ss 1 -frames:v 1 -vf scale=1280:-2 -c:v libwebp -quality 75` | ≤ 200 KB |
| `hero-miami-720.mp4` (mobile) | `-an -vf scale=-2:720 -c:v libx264 -profile:v high -crf 26 -preset slow -movflags +faststart` | ≤ 2 MB |
| `hero-miami-720.webm` (mobile) | `-an -vf scale=-2:720 -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1` | ≤ 1.5 MB |
| `hero-miami-1080.mp4` (desktop) | `-an -vf scale=-2:1080 -c:v libx264 -crf 23 -preset slow -movflags +faststart` | ≤ 4 MB |

Raise CRF until budgets are met. All files: no audio (`-an`), MP4 moov atom at start (`+faststart`) so playback can begin before full download.

Hygiene: delete unreferenced `toma aerea de miami webm1111111111111111.webm` (23 MB) **after user confirmation**. Recommended: move the 36 MB master out of `public/` (e.g. `media-src/`) so it is not deployed — also pending confirmation; default is to leave it untouched.

### 4. Adaptive, polite loading (`BackgroundVideo.vue`)

- Client-only component (inside `ClientOnly`): select source set with `matchMedia('(max-width: 850px)')` — mobile gets the 720p pair, desktop the 1080p MP4 (+ optional 720p WebM). No hydration mismatch because selection happens client-side only.
- `<video poster preload="metadata" autoplay muted loop playsinline>` with `<source type="video/webm">` first, `<source type="video/mp4">` second (browser picks by supported type; iOS lands on H.264).
- Gate: if `navigator.connection?.saveData` or `effectiveType` ∈ {`slow-2g`, `2g`} or `matchMedia('(prefers-reduced-motion: reduce)')` → render **no video at all** (poster-only; the knockout still works against the poster).
- On `playing` event, fade the video in over the poster (opacity transition ~500ms) to avoid a hard cut.
- `useHead` in `Hero.vue`: `<link rel="preload" as="image" href="/hero-miami-poster.webp">` so the poster (LCP candidate) starts immediately.
- `preload="metadata"` + autoplay: browser still fetches media for playback, but the small mobile encode + faststart means first frames arrive quickly; on gated connections nothing is fetched.

### 5. Related CSS fixes (`assets/css/global.css`)

- `.snap-container`: `height: 100vh; height: 100dvh;` (fallback pattern, same as `.snap-section` already uses).
- Repair orphaned block: add the missing `:root {` before line 32 so `--primary`, `--background-*`, `--hero-*`, etc. actually apply. Low risk: values mirror Tailwind tokens already in use.
- Dead legacy mobile styles (`.hero-mobile`, `.hero-bg-video`, …) are unused; cleanup is **optional** and out of scope by default to keep the diff focused.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Twin-layer alignment drift | Same components rendered with `visibility:hidden` + one shared `columnClasses`; verify at every breakpoint in the test matrix |
| `mix-blend-mode` cost on low-end mobile | One extra GPU-composited layer — far cheaper than a second video decode; `@supports` fallback exists |
| Older browsers without `svh`/`dvh` | `min-h-screen`/`100vh` declared first as fallback |
| iOS WebM playback | H.264 MP4 source always present; verify on real iPhone if available |
| Duplicate `<h1>`-like text in DOM (invisible twin) | Twin is a `div` with `aria-hidden`, not a heading; single real `<h1>` |
| Video still heavy on desktop | 1080p ≤ 4 MB budget + faststart + poster-first; acceptable for a hero |
| ffmpeg not installed | System install or `npx ffmpeg-static`; no permanent dependency added |

## Migration Plan

1. Create branch `fix/hero-responsive-video` from `main` (clean tree; crane removal already committed as `4be2ccd`).
2. Materialize these artifacts into `openspec/changes/improve-hero-responsive-video/`.
3. Generate assets → rebuild components → CSS fixes → full test matrix **on the branch**.
4. Merge to `main` only after the user approves test results. Rollback = delete branch / revert merge; old assets remain until cleanup is confirmed.

## Open Questions

- Confirm deletion of the 23 MB unreferenced duplicate (recommended: yes).
- Confirm moving the 36 MB master out of `public/` (recommended: yes, to `media-src/`; otherwise it ships in every static build).
- Keep knockout effect on mobile too (recommended: yes — it is cheap and consistent; fallback covers constrained devices automatically).
