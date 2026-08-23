## Why

The homepage currently scrolls as a continuous page with sections blending into each other. Adding CSS scroll-snap and section entry animations gives each section dedicated visual attention, creating a solid, cinematic feel that reflects the company's construction expertise. Mobile users benefit from app-like swipe navigation between sections.

## What Changes

- Apply `scroll-snap-type: y mandatory` to the homepage `<main>` container
- Set each section to `min-height: 100dvh` with vertically centered content
- Add `scroll-padding-top` to account for the fixed header
- Recreate the `useInView` composable (currently a corrupted binary file) for IntersectionObserver-driven animations
- Add entry animations to each section: fade+slide for ProjectPreview cards, slide from opposite sides for Services cards, none for Hero (as-is), scale+up for Process cards
- Add corresponding CSS keyframes (`slideInLeft`, `slideInRight`, `scaleIn`) and Tailwind animation utilities
- Works identically on mobile and desktop

## Capabilities

### New Capabilities
- `scroll-snap-layout`: CSS scroll-snap container, section sizing (100dvh), header offset, and responsive snap behavior across the homepage
- `section-reveal-animations`: IntersectionObserver-based entry animations triggered once per section when it snaps into view, covering staggered card reveals, slide-in, and scale effects

### Modified Capabilities
<!-- No existing specs are being modified. -->

## Impact

- `app/pages/index.vue` — main scroll container with snap
- `app/hooks/useInView.ts` — new composable (replaces corrupted file)
- `app/components/sections/home/ProjectsPreview.vue` — min-h-screen, centering, animations
- `app/components/sections/services/Services.vue` — min-h-screen, centering, slide animations
- `app/components/sections/home/CompanyDescription.vue` — bump to min-h-screen
- `app/components/sections/process/Process.vue` — min-h-screen, centering, scale animations
- `app/components/sections/home/ProjectPreviewCard.vue` — animation timing adjustment
- `app/components/sections/home/StatCard.vue` — animation timing adjustment
- `assets/css/global.css` — scroll-snap CSS, new keyframes
- `tailwind.config.js` — new animation utilities

Dark mode is already the default — no additional handling needed.
