## Why

The current Services page shows a flat grid of 6 hardcoded service cards that don't match the actual category tree (Design → Residential/Commercial, Build → Residential/Commercial → Specialties). This makes it hard for visitors to browse projects by category. Restructuring the Services section as a horizontal tree turns it into a project browser, increasing discoverability and engagement.

## What Changes

- **BREAKING**: Replace the flat 6-card grid in `app/components/sections/services/Services.vue` with a horizontal category tree (Design column | Build column) rendered from `categories.json`
- Each tree node (category) links to `/projects?category=<id>` for filtered project browsing
- Add a "Services Preview" section to the homepage with 2 top-level cards (Design, Build) linking to `/projects?category=<id>`
- Modify `useCategories` composable to aggregate child projects into parent nodes so top-level filtering works
- Modify Projects page to read `?category=` query param from URL for active filtering

## Capabilities

### New Capabilities
- `services-tree`: Replace flat service grid with horizontal category tree on the Services page
- `homepage-services-preview`: Add Design/Build top-level cards on homepage linking to filtered projects
- `url-based-project-filtering`: Projects page reads `?category=` query param for active category

### Modified Capabilities
- (none — no existing main specs to modify)

## Impact

- Modified: `app/components/sections/services/Services.vue` (full rewrite)
- Modified: `app/pages/index.vue` (add ServicesPreview section)
- Modified: `app/hooks/useCategories.ts` (aggregate child projects into parents)
- Modified: `app/components/sections/project/Projects.vue` (read URL query param)
- New: `app/components/sections/home/ServicesPreview.vue`
- New: `app/components/sections/home/ServicesPreviewCard.vue`
- Removed: hardcoded services data in Services.vue (replaced by categories.json)
- No new dependencies, no backend changes