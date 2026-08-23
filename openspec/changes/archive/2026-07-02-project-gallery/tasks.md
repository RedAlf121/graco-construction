## 1. Data Layer

- [x] 1.1 Restructure `assets/projects.json` to 4 projects aligned with Final Pics subdirectories: New Construction (15 images), General Renovation (30 images), General Commercial (32 images), Concrete Restoration & Waterproofing (34 images). Each project stores short filenames in `gallery`, cover filename in `image`, and folder name in `service`
- [x] 1.2 Create `app/hooks/useServiceImages.ts` composable with `SERVICE_BASE_PATHS` mapping, `resolveImagePath(project, filename)`, `resolveCover(project)`, and `resolveGallery(project)` functions. Warn on unknown services
- [x] 1.3 Update `app/hooks/useProjects.ts` `Project` interface if needed (service field semantics change) — verify type compatibility

## 2. Service Cards Page (/projects)

- [x] 2.1 Rewrite projects listing: `projects.vue` → parent layout with `<NuxtPage/>`, `projects/index.vue` → listing content with SectionHeader "Our Projects" and Construction Management service cards
- [x] 2.2 (removed per user request — Preconstruction Management Coming Soon deferred, only show existing content)
- [x] 2.3 Add Construction Management section with Residential (h3) and Commercial (h3) sub-headings
- [x] 2.4 Import `ServiceGalleryCard` and `useGalleries`, render 4 service cards (new-construction, renovation-projects, general-commercial, concrete-restoration) from `galleries.json` data with staggered `animate-fadeInUp` delays
- [x] 2.5 Verify build (`npm run build`) passes with new page structure

## 3. Service Project Listing (/projects/service/:slug)

- [x] 3.1 Rewrite `app/pages/projects/service/[slug].vue`: keep `useGallery(slug)` for header metadata (icon, service name, breadcrumb), replace project body with filtered `projects.json` data
- [x] 3.2 Create slug-to-hierarchy mapping: `new-construction`/`renovation-projects` → `['Build','Residential']`, `general-commercial`/`concrete-restoration` → `['Build','Commercial']`
- [x] 3.3 Filter and render matching projects as `ProjectCard` grid (1 col mobile, 2 tablet, 3 desktop), each card links to `/projects/:id` via `NuxtLink`
- [x] 3.4 Add "Service Not Found" state for invalid slugs with back link
- [x] 3.5 Add `useHead` with dynamic title and meta description

## 4. Project Detail Page (/projects/:id)

- [x] 4.1 Create `app/pages/projects/[id].vue` with route param `:id`, fetch project from `useProjects()` by numeric id, use `resolveGallery(project)` for image URLs
- [x] 4.2 Render project hero: cover image, title, description, location, service badge with `bg-primary/20` + `text-primary`
- [x] 4.3 Render image gallery grid with thumbnails, clicking opens `ModalGallery` at clicked index
- [x] 4.4 Add "Project Not Found" state for invalid IDs with back link to `/projects`
- [x] 4.5 Add back navigation link to `/projects` and `useHead` for SEO (title: `"<title> — Graco Construction Group"`)

## 5. Verification & Cleanup

- [x] 5.1 Run `npm run build` and fix any type or build errors
- [x] 5.2 Remove unused imports of `Projects.vue`, `DesktopView.vue`, `MobileView.vue` from the old `/projects` page structure
- [x] 5.3 Visual check: navigate `/projects` → click each service card → verify project listing renders → click project → verify detail page with gallery modal
