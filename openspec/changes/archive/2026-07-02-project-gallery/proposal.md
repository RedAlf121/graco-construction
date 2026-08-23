## Why

The current `/projects` page renders a complex category-based grid (DesktopView/MobileView) with inline modal galleries, but lacks dedicated project detail pages and doesn't leverage the high-quality `Final Pics/` image library. Meanwhile the "Our Services" section on the homepage has a card-based layout that users respond to well. This change restructures `/projects` to use that same card pattern, creates individual project detail pages, and aligns the data model with the actual image asset organization in `public/Final Pics/`.

## What Changes

- **`/projects` page**: Replace the current category-grid view with service cards matching the "Our Services" layout (Preconstruction Management → Coming Soon, Construction Management → Residential & Commercial sub-service cards with background images)
- **`/projects/service/:slug` pages**: Change from `galleries.json`-based photo galleries to filtered project listings from the restructured `projects.json`, showing project cards with titles, descriptions, and service badges
- **`/projects/:id` page (NEW)**: Individual project detail page with full description, location, service badge, and image gallery with ModalGallery
- **`assets/projects.json`**: Restructure from 16 small projects (with duplicated images) to 4 projects aligned with `Final Pics/` subdirectories
- **`app/hooks/useServiceImages.ts` (NEW)**: Composable mapping service names to `Final Pics/` base paths for URL resolution
- **Remove** the now-unused `Projects.vue`, `DesktopView.vue`, `MobileView.vue` components from the `/projects` page (they remain available if needed elsewhere)

## Capabilities

### New Capabilities
- `project-detail-pages`: Individual project pages at `/projects/:id` with full metadata, description, location, service, and image gallery with modal viewer. Each project represents a Final Pics folder (New Construction, General Renovation, General Commercial, Concrete Restoration & Waterproofing)
- `service-card-navigation`: Service-based card grid on `/projects` page, matching the "Our Services" visual pattern. Cards display background cover images, service icons, and photo counts. Clicking navigates to `/projects/service/:slug`
- `service-project-listing`: Filtered project listing at `/projects/service/:slug` showing projects from `projects.json` grouped by service category, with project cards linking to individual detail pages
- `final-pics-image-resolution`: Composable that resolves short image filenames to full paths within `public/Final Pics/` based on each project's `service` field

### Modified Capabilities
*(None — no existing specs are changing)*

## Impact

- **`app/pages/projects.vue`** — Full rewrite from `<Projects />` component to new service card layout
- **`app/pages/projects/[id].vue`** — New file; project detail page
- **`app/pages/projects/service/[slug].vue`** — Rewrite to use `projects.json` instead of `galleries.json` for project data
- **`assets/projects.json`** — Restructured: 4 projects (was 16), all image paths point to `Final Pics/` subdirectories
- **`app/hooks/useServiceImages.ts`** — New composable for Final Pics path resolution
- **`app/hooks/useProjects.ts`** — May need minor update if project interface changes (service field now matches Final Pics folder names)
- **Components removed from `/projects` page** (not deleted, just no longer imported there):
  - `app/components/sections/project/Projects.vue`
  - `app/components/sections/project/DesktopView.vue`
  - `app/components/sections/project/MobileView.vue`
- **No changes** to homepage (`index.vue`), `Services.vue`, `ProjectsPreview.vue`, or `galleries.json`
- **Dark theme**: All new pages follow existing dark theme conventions

## Scope

Rewrite of `/projects` page and related project data/routing. Service cards use existing `ServiceGalleryCard.vue` component. Project cards use existing `ProjectCard.vue`. Image gallery uses existing `ModalGallery.vue`. No changes to homepage, services section, or gallery JSON.

## Non-goals

- Not changing the homepage layout or "Our Services" section
- Not migrating the "Preconstruction Management" section — it stays as a Coming Soon placeholder (matching the Team page pattern)
- Not deleting existing root-level `public/` images (they remain for backward compatibility)
- Not adding pagination, filtering, or search to project listings
- Not modifying `galleries.json`
