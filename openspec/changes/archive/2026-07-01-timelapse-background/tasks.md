## 1. Parallax composable

- [x] 1.1 Create `app/hooks/useParallax.ts` — composable that accepts `containerRef` and `speed`, returns reactive `translateY` based on scroll progress
- [x] 1.2 Add mobile guard: return `translateY = 0` when `window.innerWidth < 768`
- [x] 1.3 Add passive scroll listener with proper `onMounted`/`onUnmounted` lifecycle

## 2. CompanyDescription video background

- [x] 2.1 Restructure `app/components/sections/home/CompanyDescription.vue` with layered layout: video → gradient overlay → content
- [x] 2.2 Add `<video>` element sourcing `public/timelapse construccion webm.webm` with `autoplay muted loop playsinline`
- [x] 2.3 Apply `brightness-[0.3]` to video and gradient overlay for readability
- [x] 2.4 Add `bg-background-secondary` fallback behind video for when autoplay is blocked
- [x] 2.5 Add responsive `[clip-path:polygon(...)]` — desktop `(0 8%, 100% 0%, 100% 92%, 0 100%)`, mobile `(0 4%, 100% 1%, 100% 96%, 0 99%)`
- [x] 2.6 Wire `useParallax` composable: bind `containerRef` to section, apply `translateY` to video layer
- [x] 2.7 Verify all existing content (SectionHeader, StatCards, fadeInUp animations) is preserved and properly centered

## 3. Verification

- [x] 3.1 Run `npm run build` — no type errors or build failures
- [x] 3.2 Run `npm run dev` — visual check: video plays, clip-path renders, parallax works on desktop
- [x] 3.3 Visual check on mobile viewport (< 768px): gentler clip-path, no parallax, video plays or shows fallback
