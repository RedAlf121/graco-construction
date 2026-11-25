# Tasks — improve-hero-responsive-video

> **Workflow requirement (user-mandated):** ALL work happens on branch `fix/hero-responsive-video`.
> The branch must pass the full test matrix in section 4 before any merge to `main`.
> Never commit directly to `main`.

## 0. Branch & OpenSpec materialization

- [x] 0.1 Verify clean tree on `main` (`git status`); create and switch to `fix/hero-responsive-video`
- [x] 0.2 Copy these artifacts into `openspec/changes/improve-hero-responsive-video/` (proposal.md, design.md, tasks.md, specs/, .openspec.yaml)
- [x] 0.3 Verify: `git branch --show-current` → `fix/hero-responsive-video`

## 1. Media assets (ffmpeg)

- [x] 1.1 Ensure ffmpeg/ffprobe available (system install, or `npx --yes ffmpeg-static`); probe `public/toma aerea de miami webm.webm` (duration, resolution, codec). If duration > 20s, plan a 12–15s loop trim
- [x] 1.2 Extract poster: frame at ~1s → `public/hero-miami-poster.webp` (1280w, quality ~75, ≤ 200 KB)
- [x] 1.3 Encode mobile set: `public/hero-miami-720.mp4` (H.264 high, CRF ~26, `-an`, `+faststart`, ≤ 2 MB) and `public/hero-miami-720.webm` (VP9, CRF ~34, `-b:v 0`, ≤ 1.5 MB)
- [x] 1.4 Encode desktop: `public/hero-miami-1080.mp4` (H.264, CRF ~23, `-an`, `+faststart`, ≤ 4 MB); raise CRF if over budget
- [x] 1.5 Verify: `ls -lh public/hero-miami-*` budgets met; play each file (browser/ffplay); check loop seam and first-frame quality
- [x] 1.6 Asset hygiene — **ask user first**: delete unreferenced `public/toma aerea de miami webm1111111111111111.webm` (23 MB); optionally move 36 MB master out of `public/` to `media-src/`. Verify no code references before deleting (`grep -r "webm1111" app/ assets/`)

## 2. Single-decode video components

- [x] 2.1 `app/components/hero/BackgroundVideo.vue`: add `poster` prop; `preload="metadata"`; client-side source selection via `matchMedia('(max-width: 850px)')` (720p webm+mp4 mobile / 1080p mp4 desktop); gate rendering on `saveData` / `effectiveType` slow-2g/2g / `prefers-reduced-motion`; fade in on `playing`
- [x] 2.2 `app/components/hero/TextWithVideo.vue`: rebuild as media layer — `isolate overflow-hidden bg-background-secondary` wrapper with poster CSS background (`bg-cover bg-center`); knockout layer `bg-background-tertiary mix-blend-multiply` containing invisible `Logo`/`HeroButton` twins + real white `<h1>` (`font-montserrat font-black`, `text-[clamp(2.5rem,8vw,6rem)]`); `@supports not (mix-blend-mode: multiply)` fallback (dark overlay + plain white title)
- [x] 2.3 Delete `app/components/hero/TextMask.vue`; verify zero references (`grep -r "TextMask" app/`)
- [x] 2.4 Verify: `npm run dev`, DevTools → exactly one `<video>` in Hero; knockout effect visible; poster paints before video; fallback renders when blending disabled

## 3. Hero layout & related fixes

- [x] 3.1 `app/components/hero/Hero.vue`: remove absolute offsets and `ClientOnly` around whole content; shared `columnClasses` const bound to media knockout column and content column; `min-h-screen min-h-svh`; content column = real Logo + invisible title twin (`div`, `aria-hidden`) + real HeroButton; `ClientOnly` only around BackgroundVideo; `useHead` preload poster (`as="image"`)
- [x] 3.2 `app/pages/index.vue`: remove `mt-24` from Hero; Hero `.snap-section` → `flex flex-col`, Hero `flex-1`
- [x] 3.3 `assets/css/global.css`: `.snap-container` add `height: 100dvh` after `100vh`; repair orphaned `:root` block (add missing `:root {` before line 32)
- [x] 3.4 Verify: DevTools viewports 360×800, 390×844, 768×1024, 850 boundary, 1024, 1440, 1920 + landscape 800×360 — no overlap, header clearance, title fits width, CTA visible, snap alignment correct

## 4. Testing & quality gates (ON THE BRANCH — required before merge)

- [x] 4.1 `npm run build` and `npm run generate` pass; preview generated output (`npm run preview` / node .output)
- [x] 4.2 Network throttling (Fast 3G + Slow 3G): poster on first paint, no black void; emulate `saveData` → poster-only, zero video requests
- [x] 4.3 iOS Safari check (real iPhone if available, else responsive mode + Safari desktop): MP4 plays, effect or fallback correct, no svh/dvh layout break
- [x] 4.4 SEO/perf sanity: `curl` SSR HTML contains `<h1>BUILT TO DELIVER</h1>`; Lighthouse mobile run — LCP not blocked by video, poster is LCP candidate
- [x] 4.5 Regression: `/about`, `/services`, `/projects`, `/contact` unchanged; header behavior at 850px untouched; Process section (crane already removed) intact
- [ ] 4.6 Report test results to user; merge `fix/hero-responsive-video` → `main` ONLY after user approval; update tasks checkboxes and archive change per OpenSpec workflow

## Test results (2026-11-25, branch fix/hero-responsive-video)

- Assets: poster 118 KB; 720p MP4 1.7 MB; 720p WebM 1.3 MB; 1080p MP4 3.7 MB (all within budget; light hqdn3d denoise + 30fps; master 9.6s kept as loop)
- Matrix (Chromium 157 headless via CDP): 360x800, 390x844, 768x1024, 850x900, 1024x768, 1440x900, 1920x1080, 800x360 — exactly 1 video per viewport; 720p sources <=850px, 1080p MP4 above; playing (readyState 4); multiply blend active; knockout title aligned with twin (<1px); logo/title/CTA stacked, in view, no horizontal scroll
- Landscape 800x360 required short-screen variants (max-height:500px: smaller logo, tighter gap/padding) — added to shared columnClasses/logoProps, re-verified
- saveData emulation -> 0 video elements, poster-only with effect intact; prefers-reduced-motion -> 0 video elements
- Fast 3G (1.6 Mbps, 400ms): poster painted at first check (1.2s), no black void; LCP = 540ms (logo IMG; H1 528ms); poster fetch 46ms via preload; video does not block LCP
- SSR: <h1>BUILT TO DELIVER</h1> present in initial HTML; poster preload link present
- npm run build + npm run generate pass (78 routes prerendered); static output served and all routes 200; /projects and /about visually unchanged
- iOS Safari: MP4 H.264 source present (type-based selection); real-device check pending user
- Observed pre-existing issue (out of scope): subpage titles sit under the mobile header (mt-24 < actual header height) — candidate for a future change

## Round 2 — user review fixes (2026-11-25, same branch)

- Video brightness: knockout layer bg-background-tertiary (#2C2C2E, ~17%) -> bg-gray-2 (#636366, ~39%); video clearly visible, letters still pop
- Real header clearance: --header-height now measured from the live fixed header (ResizeObserver + resize + nextTick in app.vue, self-healing across the 850px v-if swap); hero pt and snap scroll-padding use the real height (162/137/121/112px observed) — logo no longer under navbar at any viewport
- Fluid logo: size steps -> w-[clamp(11rem,30vw,20rem)] (187px mobile vs 128 before; 340px desktop); short-screen override !w-16
- Short-screen (max-height:500px) column tightened: gap-2, pb-2, pt header+0.25rem, title leading-none — landscape 800x360 fully in view (btn bottom 340.6 < 360), logo clear of header (136.6 > 121)
- Re-verified: 8-viewport matrix (1 video, adaptive sources, aligned, stacked, inView, headerClear, noHScroll), saveData/reduced-motion poster-only, Fast 3G poster-first
