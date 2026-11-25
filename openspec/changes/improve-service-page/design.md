## Context

The service grid in `projects/index.vue` renders cards from the `useGalleries()` composable via `ServiceCard` objects. Currently each card uses an absolute overlay with gradient + icon + photo count, but `card.title` is undefined because the spread `...getBySlug(slug)` provides `service` not `title`. The layout is a dense 4-column grid with small images.

## Goals / Non-Goals

**Goals:**
- Make card images larger and more visually prominent (`aspect-video`)
- Replace overlay-only layout with a two-part card: image on top + text content below
- Show title (service name) and a short placeholder description on each card
- Fix the `title` field bug in the `ServiceCard` interface
- Maintain existing dark theme styling and animation behavior

**Non-Goals:**
- Not modifying any data sources (JSON, composables)
- Not changing the `DesktopView.vue` / `MobileView.vue` / `ProjectCard.vue` components
- Not adding interactive features or modal behavior to this page
- Not changing the individual project pages (`/projects/[id].vue`)

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Layout width | `grid-cols-1 md:grid-cols-2` with `gap-6` | Wider cards allow the text section to breathe alongside a large image. 2-column on desktop is better than 4 for content-rich cards. |
| Image aspect | `aspect-video` (16:9) | Consistent with `ProjectCard.vue` pattern already used elsewhere on the site. Taller than `aspect-[4/3]` but still compact. |
| Content below image, not overlay | Remove absolute gradient overlay; add a `<div class="p-4">` block below the `<img>` | Overlays limit text length and readability. A separate content block allows variable-length descriptions and feels more like a proper card. |
| Description source | Hardcoded placeholder strings in the script section | User explicitly requested generic placeholders that they will edit later. No need to modify JSON files. |
| Title fix | Change `ServiceCard` to use `gallery.service` → assign it as `title` explicitly | The spread `...getBySlug()` provides `service` but the interface uses `title`. We map it explicitly to avoid the bug. |

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Placeholder descriptions may be too generic | They are explicitly temporary — user will replace manually after implementation |
| Layout change reduces number of visible cards per row | The trade-off is intentional: fewer cards, more information per card. The page already has only 4 services, so 2-column fits perfectly. |
| New card structure may break animation timing | Preserve existing `animate-fadeInUp` and `[animation-delay]` classes on the outer `<NuxtLink>` |
