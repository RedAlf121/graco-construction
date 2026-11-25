## 1. Page Routing Infrastructure

- [x] 1.1 Create `pages/` directory with `pages/index.vue` — move Hero and Process content from `app.vue` into it
- [x] 1.2 Rewire `app/app.vue` to use `<NuxtPage />` layout with `<Header>` and `<Footer>` wrapping, remove all section imports and template content

## 2. About Us Page

- [x] 2.1 Create `app/components/sections/about/AboutUs.vue` with company description paragraph and differentiator cards data
- [x] 2.2 Create `pages/about.vue` importing and rendering `<AboutUs />`
- [x] 2.3 Set page title via `useHead()`: "About Us — Graco Construction Group"

## 3. Services Page

- [x] 3.1 Create `app/components/sections/services/Services.vue` with service category cards (Preconstruction Management, Construction Management, Residential, Commercial)
- [x] 3.2 Create `pages/services.vue` importing and rendering `<Services />`
- [x] 3.3 Set page title via `useHead()`: "Services — Graco Construction Group"

## 4. Navigation Update

- [x] 4.1 Replace `#anchor` hrefs with `<NuxtLink to="/...">` in `app/components/header/Header.vue` for all nav links
- [x] 4.2 Remove scroll-spy (`IntersectionObserver`) logic from `Header.vue`
- [x] 4.3 Remove scroll-spy related props and state from `HeaderDesktop.vue` and `HeaderMobile.vue`

## 5. Verification

- [x] 5.1 Run `npm run build` and fix any TypeScript or build errors
- [x] 5.2 Run `npm run generate` to verify static generation
- [x] 5.3 Start dev server and confirm: navigation between `/`, `/about`, `/services` works, page titles render, Home shows Hero+Process, About and Services pages render their content
