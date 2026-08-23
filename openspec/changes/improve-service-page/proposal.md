## Why

The `/projects` service grid page currently shows only images with no descriptive text, making it hard for visitors to understand what each service offers. Additionally, cards are small (`aspect-[4/3]`) and lack proper content hierarchy, reducing visual impact and informational value.

## What Changes

- Increase card image size from `aspect-[4/3]` to `aspect-video` for a more prominent visual
- Widen grid layout from `grid-cols-2 md:grid-cols-4` to `grid-cols-1 md:grid-cols-2` with larger gaps for better readability
- Replace current absolute overlay (icon + photo count) with a structured content section below the image
- Add a title (from `gallery.service`) and a placeholder description below each card image
- Add `description` field to the `ServiceCard` interface with placeholder text for each service
- Fix the `title` field bug — currently `gallery.service` is spread onto `title` but the template references `card.title` which is undefined since `ServiceCard` uses `title` but the spread provides `service`

## Capabilities

### New Capabilities
- `service-card-content`: Structured card layout with image + title + description text for service gallery cards

### Modified Capabilities
- *(none — no existing specs to modify)*

## Impact

- **File modified**: `app/pages/projects/index.vue` — template and script changes
- **No dependencies added or removed**
- **No API changes** — data remains static from the existing `useGalleries()` composable
- **Dark mode**: respected by existing color tokens (white text, `text-white/60` for descriptions)
- **SPA-only** — no effect on future multi-page architecture
