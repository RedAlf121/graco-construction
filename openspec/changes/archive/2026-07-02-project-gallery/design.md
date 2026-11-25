## Context

The current `/projects` page uses a single large component (`Projects.vue`) that renders a hierarchical category grid (Design/Build → Residential/Commercial) via `DesktopView` and `MobileView`. Project detail is only accessible through a `ModalGallery` overlay — there are no dedicated project pages. Images are referenced from `public/` root with inconsistent naming. Meanwhile, `public/Final Pics/` contains 148 high-quality images organized into 4 service subdirectories that are only used by `galleries.json` (via `useGalleries`), not by `projects.json`.

This design restructures the project gallery around service-based cards (matching the "Our Services" visual pattern), creates individual project detail pages, and aligns the data model with the actual image asset layout.

## Goals / Non-Goals

**Goals:**
- Replace `/projects` category grid with service cards (ServiceGalleryCard pattern)
- Create individual project detail pages at `/projects/:id`
- Restructure `projects.json` to 4 projects aligned with `Final Pics/` folders
- Add composable for resolving Final Pics image paths from short filenames
- Update `/projects/service/:slug` to use `projects.json` data instead of `galleries.json`

**Non-Goals:**
- Not changing `galleries.json` or the homepage
- Not deleting old `public/` root images
- Not implementing Preconstruction Management content (Coming Soon only)
- Not adding project search, filtering, or pagination
- Not adding SSR/SSG config changes (exists already)

## Decisions

### Decision 1: 4 projects in projects.json instead of 16
**Choice**: Restructure from 16 small projects (with duplicated/circular image references) to 4 projects — one per Final Pics subdirectory.
**Rationale**: The Final Pics images are organized by service type, not by individual named project. Trying to map specific project names ("Boria Residence") to generic construction-site photos is artificial. Each of the 4 Final Pics folders represents a distinct service offering, so each becomes one "project" in the data model.
**Alternatives considered**: Keep 16 projects but reassign images — rejected because image-to-project mapping is unknown and would be arbitrary.

### Decision 2: Filename-only gallery entries with service→basePath mapping
**Choice**: Store only filenames (e.g., `"1.jpg"`) in `projects.json` gallery arrays, and resolve full URLs via a `useServiceImages()` composable that maps `service` → `basePath` in Final Pics.
**Rationale**: Keeps `projects.json` lean. If images are reorganized later, only the mapping composable changes, not every project entry.
**Trade-off**: Requires a runtime resolution step. Minimal performance impact since it's a simple string concatenation in a composable.

### Decision 3: Reuse existing components (ServiceGalleryCard, ProjectCard, ModalGallery)
**Choice**: Use `ServiceGalleryCard` for service cards on `/projects`, `ProjectCard` for project listings on `/projects/service/:slug`, and `ModalGallery` for image viewing on `/projects/:id`.
**Rationale**: These components already exist with the right visual patterns and design tokens. No need to rebuild.
**Risk**: `ServiceGalleryCard` currently expects a `Gallery` type from `useGalleries`. We'll adapt the `/projects` page to construct a compatible object from `galleries.json` data.

### Decision 4: Preconstruction Management = Coming Soon (matching Team page)
**Choice**: The Preconstruction Management section shows a simple "Coming Soon" placeholder, identical to the Team page pattern.
**Rationale**: The user explicitly requested this. Design-related project content will be added later.

### Decision 5: Both `new-construction` and `renovation-projects` show the same projects
**Choice**: Both slugs map to `['Build', 'Residential']` hierarchy, showing the same projects (New Construction and General Renovation projects).
**Rationale**: The current data model doesn't differentiate between new construction and renovation at the individual project level. Both fall under "Build → Residential." Future data refinement can add a `type` field to distinguish them.

### Decision 6: Back navigation — `/projects` for detail pages
**Choice**: Project detail pages (`/projects/:id`) link back to `/projects`, not to the specific service page.
**Rationale**: Since both `new-construction` and `renovation-projects` can lead to the same projects, determining the correct "back" slug is ambiguous without query params or referrer tracking. Simpler to link to the main listing.

## Risks / Trade-offs

- **[Data coupling]** `projects.json` `service` field must match a key in `SERVICE_BASE_PATHS` map → **Mitigation**: Add validation in the composable and log a warning for unknown services
- **[Loss of granularity]** Reducing from 16 to 4 projects loses per-project narrative diversity → **Acceptable**: The 16 projects had duplicated/circular image references and no unique content per project
- **[Slug duality]** Both `new-construction` and `renovation-projects` show identical project data → **Acceptable**: Clearly documented. Future work can add project-level `type` field for differentiation
- **[Path resolution]** Image extension inconsistency (`.jpg`, `.jpeg`, `.jfif`, `.JPG`, `.HEIC`) means we must store exact filenames, not just numbers → **Accepted**: Already accounted for in filename-only approach
