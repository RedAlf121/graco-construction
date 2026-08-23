## Context

The "Design. Build. Deliver." section (`CompanyDescription.vue`) is currently plain text + stat cards with no visual drama. The project already has:
- A timelapse video asset (`public/timelapse construccion webm.webm`) that is not used anywhere
- An existing `TimeLapseVideo.vue` component with a similar clip-path window (also unused)
- Pattern precedent: `ProcessCard.vue` and `BackgroundVideo.vue` both embed video as backgrounds
- Orphaned parallax CSS classes in `global.css` (mobile-only, never wired to components)

This design embeds the video background directly into `CompanyDescription.vue` rather than creating a separate wrapper component, keeping the change self-contained.

## Goals / Non-Goals

**Goals:**
- Transform "Design. Build. Deliver." into a dramatic full-width video section with clip-path and parallax
- Preserve all existing content (SectionHeader, 3 StatCards) and their animations
- Optimize for mobile: gentler clip-path, no parallax, dark fallback

**Non-Goals:**
- Not creating a reusable video-section wrapper (deferred — can extract later if needed)
- Not modifying any other section (hero, process, services, etc.)
- Not removing or refactoring `TimeLapseVideo.vue` (leave in tree)
- Not changing `index.vue` or any page layout

## Decisions

### Decision: Embed video inside CompanyDescription.vue (no wrapper)
- **Why**: Single section change. Creating a generic `VideoSection` wrapper adds indirection for no current reuse. If a second video section is needed later, extraction is trivial.
- **Alternative considered**: Slot-based wrapper. Rejected because it adds complexity without immediate benefit.

### Decision: Composable-based parallax (useParallax)
- **Why**: Keeps the scroll logic testable and isolated. Follows existing pattern (`useProjects`, `useCategories` in `app/hooks/`).
- **How it works**: Takes a `containerRef` and `speed` parameter. Listens to passive scroll events, computes progress based on element position within viewport, returns a reactive `translateY` value.
- **Mobile**: Returns `translateY = 0` when `window.innerWidth < 768`.

### Decision: Tailwind classes over custom CSS
- **Why**: The entire codebase uses Tailwind for styling. The clip-path and parallax values are specific enough to use arbitrary value syntax (`[clip-path:polygon(...)]`).
- **Exception**: The dark fallback background uses an existing Tailwind bg color (`bg-background-secondary`).

### Decision: Asymmetric clip-path on the `<section>` element
- **Why**: Applying clip-path to the outermost container ensures both the video and content are clipped by the same boundary. This is simpler and more correct than applying it to an inner div.

## Risks / Trade-offs

- [Risk] iOS Safari may block video autoplay → **Mitigation**: Dark fallback background behind the video ensures no blank space
- [Risk] Parallax scroll listener could cause jank on low-end devices → **Mitigation**: Parallax disabled on mobile; desktop uses passive event listener with `will-change: transform`
- [Risk] The clip-path cuts off section shadows/borders → **Accepted**: This is desired behavior — the 3D shadow effect from the existing `TimeLapseVideo` (using `shadow-[...]`) creates the illusion that the window is raised from the page surface
- [Trade-off] No reusable component yet → If a second section needs this pattern, extract `VideoSection.vue` at that point
- [Trade-off] The `useParallax` composable is section-specific in its current form → It returns a simple `translateY` value; generalizing it later is straightforward
