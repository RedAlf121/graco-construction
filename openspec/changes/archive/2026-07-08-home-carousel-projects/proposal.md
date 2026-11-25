## Why

The "Featured Projects" section on the home page currently renders 3 hardcoded projects in a static 3-column grid. As the project portfolio grows, the section feels static and doesn't invite exploration. A carousel with autoplay and infinite loop makes the section more dynamic, showcases more projects without taking more vertical space, and gives users an interactive way to browse featured work.

## What Changes

- Replace the static `md:grid-cols-3` grid in `ProjectsPreview.vue` with an Embla-based carousel
- Add Embla Carousel as a dependency (`embla-carousel`, `embla-carousel-vue`, `embla-carousel-autoplay`)
- Carousel shows 3 cards at a time, slides 3 at a time (page-by-page), with infinite loop and autoplay at 4s
- Add prev/next arrow buttons and dot indicators matching existing UI conventions (ModalGallery style)
- Simplify the hardcoded `featuredProjects` data array: remove `id` field, keep only `title`, `image`, `service`
- `ProjectPreviewCard.vue` remains unchanged (tilt effect, overlay, styling preserved)

## Capabilities

### New Capabilities
- `home-carousel`: Autoplay carousel for the Featured Projects section on the home page, with 3-visible, 3-scroll page navigation, infinite loop, autoplay, arrow buttons, and dot indicators.

### Modified Capabilities

None — this is a new feature.

## Impact

- **Dependencies added**: `embla-carousel`, `embla-carousel-vue`, `embla-carousel-autoplay`
- **Files modified**:
  - `app/components/sections/home/ProjectsPreview.vue` — major rework (grid → carousel)
- **Files unchanged**: `ProjectPreviewCard.vue` (no changes needed)
- **Dark mode**: No impact — existing dark theme is preserved
- **Accessibility**: Arrow buttons and dots must have `sr-only` labels (following `ModalGallery.vue` pattern)
