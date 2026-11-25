## Phase 1: Data Files

### Task 1.1: Update services.json with Medical Facilities
- [x] Add `slug` field to all service nodes
- [x] Add `category` field to leaf services ('residential' | 'commercial')
- [x] Add Medical Facilities under Construction Management > Commercial > children[]
- [x] Set `id: "medical-facilities"`, `slug: "medical-facilities"`, `icon: "fa-hospital"`
- [x] Add description for Medical Facilities
- **Verify**: Load in browser, check `useServices()` returns 5 leaf services

### Task 1.2: Create new projects.json
- [x] Create 20 projects (4 per service: new-construction, renovation-projects, general-commercial, medical-facilities, concrete-restoration)
- [x] Use non-sequential IDs (1, 8, 3, 15, 7, 12, 2, 11, 5, 18, 4, 9, 16, 20, 6, 13, 10, 17, 14, 19)
- [x] Set realistic names (e.g., "Coral Gables Modern Estate", "Brickell High-Rise Condo")
- [x] Use specific Miami locations (Coral Gables, Brickell, Aventura, Key Biscayne, etc.)
- [x] Vary years (2021-2025) and `includesPreConstruction` (true/false mixed)
- [x] Set `coverImage` paths from `/Final Pics/` pool
- [x] Set `status` as 'completed', 'in-progress', or 'planned'
- **Verify**: JSON validates, all `serviceId` values match services.json leaf IDs

### Task 1.3: Update galleries.json
- [x] Change all `serviceId` fields to `projectId`
- [x] Create 20 gallery entries (one per project)
- [x] Each gallery has exactly 4 images from `/Final Pics/` (mixed selection)
- [x] Ensure all `projectId` values match projects.json IDs
- [x] Remove fields: `slug`, `service`, `icon`, `cover`, `count`
- **Verify**: JSON validates, all image paths exist in `/public/`

### Task 1.4: Remove categories.json
- [x] Delete `assets/categories.json`
- **Verify**: File deleted

---

## Phase 2: Composables

### Task 2.1: Update useServices.ts
- [x] Add `slug: string` to `ServiceNode` interface
- [x] Add `category?: 'residential' | 'commercial'` to `ServiceNode` interface
- [x] Update `servicesFlat` computed to index by both `id` and `slug`
- [x] Add `getLeafServices()` function (returns services with no children)
- [x] Update `getServicePath()` to search by slug as well as id
- [x] Update `getServiceHref()` to return `/services/${slug}/projects`
- **Verify**: TypeScript compiles, `getLeafServices()` returns 5 items

### Task 2.2: Refactor useProjects.ts
- [x] Update `Project` interface with new fields (name, serviceId, includesPreConstruction, location, year, coverImage, status)
- [x] Remove old fields (service as string, gallery as array, hierachy)
- [x] Add computed join fields: `service?: ServiceNode`, `gallery?: Gallery`
- [x] Implement `projects` computed with joins to `servicesFlat` and `galleries`
- [x] Implement `getById(id)` function
- [x] Implement `getByService(serviceId)` function (accepts id or slug)
- [x] Implement `getByCategory(category)` function
- [x] Implement `getWithPreConstruction()` function
- [x] Return object with `{ projects, getById, getByService, getByCategory, getWithPreConstruction }`
- **Verify**: TypeScript compiles, `projects.value.length === 20`

### Task 2.3: Update useGalleries.ts
- [x] Update `Gallery` interface: change `serviceId` to `projectId`
- [x] Remove unused fields from interface if any
- [x] Update `getByProjectId(projectId)` function (rename from `getBySlug` if needed)
- **Verify**: TypeScript compiles, `getByProjectId(1)` returns correct gallery

### Task 2.4: Remove useCategories.ts
- [x] Delete `app/hooks/useCategories.ts`
- **Verify**: File deleted, search codebase for imports (should find none after next phase)

---

## Phase 3: Components

### Task 3.1: Update Projects.vue
- [x] Replace `useCategories()` import with `useServices()` and `useProjects()`
- [x] Create `servicesWithProjects` computed (map leaf services → projects + count)
- [x] Update `DesktopView` and `MobileView` props to `:services="servicesWithProjects"`
- **Verify**: Section renders, shows 5 services, TypeScript compiles

### Task 3.2: Update DesktopView.vue
- [x] Update props interface from `categories: CategoryNode[]` to `services: Array<{ service: ServiceNode; projects: Project[]; count: number }>`
- [x] Update template to iterate over `services` instead of `categories`
- [x] Update references to `category.name` → `service.service.name`, etc.
- **Verify**: Desktop view renders correctly at > 1024px

### Task 3.3: Update MobileView.vue
- [x] Apply same changes as DesktopView.vue
- **Verify**: Mobile view renders correctly at < 1024px

### Task 3.4: Update MobileCategorySelect.vue (if exists)
- [x] Update props/logic to work with services instead of categories
- **Verify**: Dropdown shows 5 services

### Task 3.5: Update ProjectCard.vue
- [x] Update props interface `Project` to match new structure
- [x] Update template: `project.service` is now object, use `project.service.name`
- [x] Update gallery reference if needed
- **Verify**: Card renders with project name, service name, cover image

### Task 3.6: Update ModalGallery.vue (if exists)
- [x] Update to use `project.gallery.images` instead of `project.gallery` array
- **Verify**: Modal opens with correct images

---

## Phase 4: Pages & Routing

### Task 4.1: Update pages/projects/[id].vue
- [x] Replace `useProjects()` array with `useProjects()` object
- [x] Use `getById(route.params.id)` instead of array find
- [x] Update template references to new project structure
- **Verify**: `/projects/1` loads correctly, shows project name and gallery

### Task 4.2: Create pages/services/[slug]/projects.vue
- [x] Create directory `app/pages/services/[slug]/`
- [x] Create `projects.vue` file
- [x] Implement: load service by slug, load projects by service, render grid
- [x] Add breadcrumb link back to `/projects`
- [x] Add service name as h1, description as subtitle
- [x] Show project count
- [x] Render `ProjectCard` components in grid
- [x] Add 404 handling if service slug not found
- [x] Set page meta (title, description) using `useHead()`
- **Verify**: `/services/new-construction/projects` loads, shows 4 projects

### Task 4.3: Update links in Footer.vue
- [x] Find all `NuxtLink` to `/projects/service/${slug}`
- [x] Replace with `/services/${slug}/projects`
- **Verify**: Footer links navigate correctly

### Task 4.4: Update links in Services.vue
- [x] Find all `NuxtLink` to `/projects/service/${slug}`
- [x] Replace with `/services/${slug}/projects`
- **Verify**: Service cards navigate correctly

### Task 4.5: Update links in Header.vue (if any)
- [x] Search for any service links
- [x] Replace with new pattern
- **Verify**: Header links navigate correctly

### Task 4.6: Remove pages/projects/service/[slug].vue
- [x] Delete `app/pages/projects/service/[slug].vue`
- [x] Delete directory `app/pages/projects/service/` if empty
- **Verify**: Files deleted, old route no longer accessible

---

## Phase 5: Verification & Cleanup

### Task 5.1: Type check
- [x] Run `npm run build` or `npx nuxi typecheck`
- [x] Fix any TypeScript errors
- **Verify**: Build succeeds with 0 errors

### Task 5.2: Visual verification
- [x] Load `/` in browser
- [x] Check Projects section renders 5 services
- [x] Click service card → navigates to `/services/[slug]/projects`
- [x] Verify 4 projects shown per service
- [x] Click project card → navigates to `/projects/[id]`
- [x] Verify project detail page shows name, location, year, gallery
- [x] Check Footer service links work
- [x] Check Services section links work
- **Verify**: All pages render correctly, no console errors

### Task 5.3: Mobile verification
- [x] Test at 850px width (nav breakpoint)
- [x] Test at < 1024px (layout breakpoint)
- [x] Verify touch interactions work
- **Verify**: Mobile views render correctly

### Task 5.4: Backup cleanup
- [x] Remove `.backup` files if any were created
- **Verify**: No backup files in assets/

### Task 5.5: Update documentation
- [x] Update `AGENTS.md` with new data model architecture
- [x] Document new composable APIs
- [x] Document URL structure change
- **Verify**: AGENTS.md reflects current state

---

## Estimated Time

- Phase 1 (Data): 1.5 hours
- Phase 2 (Composables): 1.5 hours
- Phase 3 (Components): 2 hours
- Phase 4 (Pages/Routing): 1.5 hours
- Phase 5 (Verification): 1 hour

**Total: ~7.5 hours**
