## 1. Dependencies

- [x] 1.1 Install Embla packages: `npm install embla-carousel embla-carousel-vue embla-carousel-autoplay`

## 2. Component Rewrite — ProjectsPreview.vue

- [x] 2.1 Replace the `interface Project` with `FeaturedProject` (remove `id` field, keep `title`, `image`, `service`)
- [x] 2.2 Update `featuredProjects` array — remove `id` from each entry, simplify to `{ title, image, service }`
- [x] 2.3 Replace the grid template with Embla viewport/container structure: `.viewport > .container > .slide × N`
- [x] 2.4 Initialize Embla with `align: 'start', slidesToScroll: 3, loop: true` and Autoplay plugin (4s, stopOnInteraction)
- [x] 2.5 Add prev/next arrow buttons with SVG chevrons (same style as ModalGallery) — wired to `emblaApi.scrollPrev()` / `emblaApi.scrollNext()`
- [x] 2.6 Add dot indicators below carousel — track `selectedSnap` and `snapCount`, hide when `snapCount <= 1`
- [x] 2.7 Remove `project.id` key usage in `v-for` — use index as key

## 4. Responsive Implementation

- [ ] 4.1 Add responsive Tailwind classes to slide div: `flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]`
- [ ] 4.2 Add `getSlidesToScroll()` helper function returning 1/2/3 based on `window.innerWidth`
- [ ] 4.3 Use `getSlidesToScroll()` as initial value for Embla's `slidesToScroll`
- [ ] 4.4 Add resize listener in `onMounted` that calls `emblaApi.reInit()` with new `slidesToScroll` on breakpoint change (debounced 150ms)
- [ ] 4.5 Add cleanup of resize listener in `onBeforeUnmount`

## 5. Verification

- [ ] 5.1 Run `npm run build` — verify no type or build errors
- [ ] 5.2 Run `npm run dev` — visually verify carousel renders 3 cards (desktop), 2 cards (tablet), 1 card (mobile), navigation works at each breakpoint, autoplay loops, dots update correctly
- [ ] 5.3 Confirm `ProjectPreviewCard.vue` is unchanged (git diff should show no changes to that file)
