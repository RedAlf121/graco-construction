## 1. URL-based Project Filtering

- [x] 1.1 Modify `app/hooks/useCategories.ts` to aggregate child projects into parent category nodes
- [x] 1.2 Modify `app/components/sections/project/Projects.vue` to read `?category=` query param from URL and set `activeCategory`

## 2. Services Page Tree

- [x] 2.1 Rewrite `app/components/sections/services/Services.vue` to render a horizontal two-column tree (Residential | Commercial) with sub-items (New Construction, Renovation, specialties) linking to `/projects?category=<id>`
- [x] 2.2 Add icon mapping for category tree nodes (Design, Build, Residential, Commercial)

## 3. Homepage Services Preview

- [x] 3.1 Create `app/components/sections/home/ServicesPreview.vue` with two cards (Design, Build) linking to `/projects?category=design` and `/projects?category=build`
- [x] 3.2 Add `<ServicesPreview />` to `app/pages/index.vue`

## 4. Verification

- [x] 4.1 Verify dev server renders: homepage with ServicesPreview, Services page with tree, Projects page reading `?category=` param
