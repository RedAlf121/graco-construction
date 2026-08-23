## 1. Infrastructure: CSS scroll-snap + useInView hook

- [x] 1.1 Add scroll-snap CSS to `assets/css/global.css`: `scroll-snap-type: y mandatory` on main, `scroll-snap-align` on sections, `scroll-padding-top` with media queries for header offset, `100dvh` fallback
- [x] 1.2 Recreate `app/hooks/useInView.ts` with IntersectionObserver composable (`threshold`, `once` options, ref callback, cleanup on unmount)
- [x] 1.3 Add new keyframes and animation utilities to `tailwind.config.js`: `slideInLeft`, `slideInRight`, `scaleIn`

## 2. Scroll snap layout on homepage

- [x] 2.1 Update `app/pages/index.vue`: add scroll-snap CSS classes to `<main>`, make it a snap container with `h-screen overflow-y-scroll`
- [x] 2.2 Convert each section to `min-h-screen` with vertically centered content via `flex items-center justify-center` wrapper
- [x] 2.3 Add `scroll-snap-align: start` to each section and `scroll-snap-align: end` to `<Footer>`
- [x] 2.4 Verify Hero section keeps existing `min-h-screen` and no animation is added

## 3. Section entry animations

- [x] 3.1 Update `app/components/sections/home/ProjectsPreview.vue`: use `useInView`, wrap content in centered flex, add staggered `animate-fadeInUp` on cards triggered by `isVisible`
- [x] 3.2 Update `app/components/sections/services/Services.vue`: use `useInView`, replace manual IntersectionObserver, add `animate-slideInLeft`/`animate-slideInRight` on the two cards
- [x] 3.3 Update `app/components/sections/home/CompanyDescription.vue`: bump to `min-h-screen`, use `useInView` to trigger stat animations on section entry
- [x] 3.4 Update `app/components/sections/process/Process.vue`: use `useInView`, add centered wrapper, add staggered `animate-scaleIn` on ProcessCards
- [x] 3.5 Update `app/components/sections/home/ProjectPreviewCard.vue` and `StatCard.vue`: ensure animation timing works correctly with new section-triggered approach

## 4. Verification

- [x] 4.1 Run `npm run build` (or `nuxi build`) to verify no type or build errors
- [x] 4.2 Run `npm run dev` and visually verify: each section snaps into full view, header does not overlap content, animations play on entry, Hero is unchanged
- [x] 4.3 Test on mobile viewport (responsive mode): snap works, sections fill viewport, animations play correctly
