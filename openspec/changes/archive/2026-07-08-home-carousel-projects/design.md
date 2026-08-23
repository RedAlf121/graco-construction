## Context

The "Featured Projects" section (`ProjectsPreview.vue`) currently renders 3 hardcoded projects in a static 3-column grid (`md:grid-cols-3`). Each card uses `ProjectPreviewCard.vue` which includes a 3D tilt effect via `useTilt` composable and a hover overlay with gradient. The only existing carousel in the project is `ModalGallery.vue` (modal-based image gallery on project detail pages). No third-party slider library is currently installed.

This change replaces the grid with an Embla Carousel that shows 3 cards at a time on desktop, 2 on tablet, 1 on mobile, and scrolls page-by-page (offset matching visible count). The goal is to keep the same visual identity while making the section interactive, scrollable, and responsive across all viewports.

## Goals / Non-Goals

**Goals:**
- Show 3 Featured Project cards at a time in a horizontal carousel
- Scroll 3 cards at a time (full page) — slides group into pages of 3
- Infinite loop wrapping
- Autoplay at 4-second intervals, pausing on user interaction
- Prev/next arrow buttons with chevron icons (matching ModalGallery button style)
- Dot indicators below the carousel showing page position
- Same visual identity: ProjectPreviewCard with tilt, overlay, shadows, dark theme

**Non-Goals:**
- No drag/swipe customization (Embla defaults suffice)
- No keyboard navigation (deferred — carousel is not a modal)
- No changes to ProjectPreviewCard.vue

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Library | Embla Carousel (embla-carousel + embla-carousel-vue + embla-carousel-autoplay) | Lightweight (~12KB), zero deps, excellent Vue integration, widely adopted, more polished than a custom scroll-snap implementation |
| Items per view | 3 / 2 / 1 (responsive) | Desktop: 3 cards (33.333% each), Tablet ≥768px: 2 cards (50% each), Mobile <768px: 1 card (100%). Controlled via Tailwind responsive classes `flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]` |
| Scroll amount | 3 / 2 / 1 (responsive) | Matches visible cards per breakpoint. Updated dynamically via `emblaApi.reInit()` on viewport resize (`getSlidesToScroll()` helper) |
| Autoplay | 4s, stopOnInteraction: true | Gives users time to read each page; stops when user navigates so they're not fighting the autoplay |
| Loop | true (infinite) | Seamless experience — last page wraps to first and vice versa |
| Button style | Absolute positioned, bg-black/50 hover:bg-black/70, 10px square, SVG chevron | Matches existing ModalGallery.vue button aesthetic exactly |
| Dot style | 8px squares, active = bg-primary (#FF9F0A) with width 16px, inactive = bg-white/30 | Same pattern as ModalGallery.vue |
| Data | Inline array in ProjectsPreview.vue, no `id` field | User preference; keeps it simple to add entries |

### Architecture

```
ProjectsPreview.vue
├── SectionHeader (unchanged)
├── .carousel-container (overflow-hidden, relative, mx-auto max-w-6xl)
│   ├── .viewport (overflow-hidden, ref for Embla)
│   │   └── .container (flex, Embla manages transform)
│   │       └── .slide (flex: 0 0 100% md:flex: 0 0 50% lg:flex: 0 0 33.3333%, min-width: 0) × N
│   │           └── ProjectPreviewCard (unchanged)
│   ├── button.prev (absolute left-2 top-1/2)
│   └── button.next (absolute right-2 top-1/2)
├── .dots (flex justify-center gap-2 mt-6)
│   └── button.dot (w-2 h-2) × snapCount
└── [View All Projects] (unchanged)
```

### Responsive Strategy

The carousel achieves responsive behavior through two mechanisms:

1. **CSS (visible cards):** Tailwind responsive classes on the slide element control how many cards are visible. At each breakpoint, the flex basis changes: 100% (mobile), 50% (tablet), or 33.3333% (desktop).

2. **JS (scroll amount):** A `getSlidesToScroll()` function detects the current viewport width and returns 1, 2, or 3. This value is used at init and updated via `emblaApi.reInit()` when the viewport crosses a breakpoint (debounced at 150ms). The autoplay is paused during reinit to prevent conflicts.

Breakpoint detection uses `window.innerWidth` matching the same thresholds as Tailwind's `md` (768px) and `lg` (1024px) breakpoints.

### Embla Plugins

```typescript
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const getSlidesToScroll = (): number => {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 768) return 2
  return 1
}

const [emblaNode, emblaApi] = emblaCarouselVue(
  {
    align: 'start',
    slidesToScroll: getSlidesToScroll(),
    loop: true,
  },
  [Autoplay({ delay: 4000, stopOnInteraction: true })]
)
```

### State Tracking

```typescript
const selectedSnap = ref(0)
const snapCount = ref(0)

let resizeHandler: (() => void) | null = null

onMounted(() => {
  if (!emblaApi.value) return
  const onSelect = () => {
    selectedSnap.value = emblaApi.value!.selectedScrollSnap()
    snapCount.value = emblaApi.value!.scrollSnapList().length
  }
  emblaApi.value.on('select', onSelect)
  onSelect()

  resizeHandler = () => {
    const newSlidesToScroll = getSlidesToScroll()
    emblaApi.value?.reInit({ slidesToScroll: newSlidesToScroll })
  }
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  if (resumeTimer) clearTimeout(resumeTimer)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
```

## Risks / Trade-offs

- **Risk**: Adding an npm dependency for what could be done with CSS scroll-snap
  → **Mitigation**: Embla is lightweight (12KB), well-maintained, and provides autoplay, loop, and snap API that would require significant custom JS to replicate reliably.
- **Risk**: Autoplay continues after user navigates if `stopOnInteraction` doesn't capture all interactions
  → **Mitigation**: Embla's `stopOnInteraction` pauses on any user-initiated action (click, drag, wheel). Autoplay resumes only after page reload or explicit `reInit()`.
- **Risk**: Odd number of projects (e.g., 4) leaves a partial last page
  → **Mitigation**: Embla handles this gracefully — the last snap position shows whatever slides remain. With groups of 3, 6 is ideal; odd counts display partial final pages, which is acceptable UX.
