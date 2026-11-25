## Why

The "Design. Build. Deliver." section (CompanyDescription.vue) is the weakest visual section on the homepage despite being a core brand statement. A full-width timelapse construction video background with parallax and an asymmetric clip-path window will elevate it into a memorable brand moment that matches the visual intensity of the hero and process sections.

## What Changes

- **CompanyDescription.vue** — embed a full-width timelapse video background with dimming overlay, bounded by an asymmetric `clip-path` for a dynamic angled presentation
- **New `useParallax` composable** — drives scroll-driven parallax on the video layer (desktop only)
- **Mobile adaptation** — gentler clip-path angles, parallax disabled, dark fallback background for browsers that block video autoplay

## Capabilities

### New Capabilities
- `video-background-section`: Pattern for embedding a full-bleed video background beneath section content with optional parallax and clip-path windowing

### Modified Capabilities

- *(none)*

## Impact

- **Modified**: `app/components/sections/home/CompanyDescription.vue`
- **New file**: `app/hooks/useParallax.ts`
- **Unchanged**: `index.vue`, `StatCard.vue`, `SectionHeader.vue`, all other components
- **Asset used**: `public/timelapse construccion webm.webm` (already exists, currently unused)
- **Dark mode**: unaffected — site defaults to dark
- **Current SPA**: unaffected
