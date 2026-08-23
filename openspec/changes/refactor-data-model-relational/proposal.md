## Why

The current data model treats services as if they were projects. The `projects.json` file contains 4 generic "projects" (New Construction, General Renovation, etc.) that are actually service categories, not real construction projects. This creates confusion and limits the ability to showcase actual project work with specific locations, timelines, and details.

Additionally, the project lacks the "Medical Facilities" service under Commercial, and the URL structure (`/projects/service/[slug]`) doesn't align with a service-first navigation pattern.

## What Changes

### Data Model (JSON Files)
- **Rename** `assets/projects.json` conceptually to service categories (content will be replaced)
- **Update** `assets/services.json` to add Medical Facilities under Construction Management > Commercial
- **Create** new `assets/projects.json` with 20 real mock projects (4 per service: New Construction, Renovation Projects, General Commercial, Medical Facilities, Concrete Restoration)
- **Update** `assets/galleries.json` to reference `projectId` instead of `serviceId`
- **Remove** `assets/categories.json` (redundant with services.json hierarchy)

### Composables
- **Update** `app/hooks/useServices.ts` to add `slug` field and `getLeafServices()` method
- **Refactor** `app/hooks/useProjects.ts` to load real projects with relational joins to services and galleries
- **Update** `app/hooks/useGalleries.ts` to reference `projectId` instead of `serviceId`
- **Remove** `app/hooks/useCategories.ts` (no longer needed)

### Components & Pages
- **Update** `app/components/sections/project/Projects.vue` to use services instead of categories
- **Update** `app/components/sections/project/DesktopView.vue` props
- **Update** `app/components/sections/project/MobileView.vue` props
- **Update** `app/components/sections/project/ProjectCard.vue` interface
- **Update** `app/pages/projects/[id].vue` to use new project structure
- **Create** `app/pages/services/[slug]/projects.vue` (new route)
- **Remove** `app/pages/projects/service/[slug].vue` (old route)
- **Update** all component links from `/projects/service/[slug]` to `/services/[slug]/projects`

### URL Structure
- **Before**: `/projects/service/new-construction`
- **After**: `/services/new-construction/projects`

## Capabilities

### New Capabilities
- `services-json-schema`: Services hierarchy with Medical Facilities and slug fields
- `projects-json-schema`: 20 real mock projects with relational references
- `galleries-json-schema`: Image galleries linked by projectId
- `composables-refactor`: Relational data loading with joins
- `components-update`: Components using new data structure
- `routing-migration`: New /services/[slug]/projects route pattern

### Modified Capabilities
- *(none — this is a foundational refactor)*

## Impact

- **Files created**: `assets/projects.json` (new content), `app/pages/services/[slug]/projects.vue`
- **Files modified**: `assets/services.json`, `assets/galleries.json`, 3 composables, 6+ components
- **Files removed**: `assets/categories.json`, `app/hooks/useCategories.ts`, `app/pages/projects/service/[slug].vue`
- **Breaking changes**: All existing links to `/projects/service/*` must be updated
- **No dependencies added or removed**
- **Dark mode**: fully preserved
- **Architecture**: moves toward service-first navigation pattern (aligns with future multi-page vision)

## Scope

### In Scope
- Complete data model refactor from service-as-project to real projects
- All 20 mock projects with realistic names, locations, years
- Medical Facilities service addition
- URL migration to `/services/[slug]/projects`
- Type safety updates for all interfaces

### Non-Goals
- Not creating actual project images (reusing existing `/Final Pics/` pool)
- Not implementing project filtering/sorting UI (data structure supports it, UI comes later)
- Not adding authentication or team roles (future phase)
- Not modifying Services section rendering (already correct)
- Not implementing i18n (Spanish/English support is future)
