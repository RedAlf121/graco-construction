## Context

Current site is a SPA: `app.vue` assembles all sections (Hero, Process, Projects, Team, Contact, Footer), nav uses `#` anchors with scroll-spy. About Us and Services are missing entirely. The target is multi-page: each nav link is a real Nuxt page with its own URL.

## Goals / Non-Goals

**Goals:**
- Create Nuxt `pages/` directory with `index.vue` (home), `about.vue`, `services.vue`
- Rewire `app.vue` from section assembly to `<NuxtPage />` layout
- Add `/about` page with company story, values, differentiators
- Add `/services` page with service category cards
- Replace `#anchor` nav links with `<NuxtLink to="/path">`
- Remove scroll-spy and `IntersectionObserver` from Header (no longer needed)
- Keep existing components (Process, Projects, Team, Contact) as page-content building blocks

**Non-Goals:**
- No new data models, composables, or JSON files (static content only)
- No i18n — English only for now
- Not converting Projects, Team, or Contact to pages yet (that's a follow-up change)
- No changes to existing component internals (Hero, Process, etc. stay as-is)

## Decisions

1. **pages/ directory over dynamic routing** — Nuxt 4 `pages/` directory auto-generates routes. Create `pages/index.vue`, `pages/about.vue`, `pages/services.vue`. Each page imports the relevant components.

2. **app.vue as layout shell** — Switch from assembling all sections to rendering `<NuxtPage />` with `<Header>` and `<Footer>` wrapping it. This is the standard Nuxt pattern.

3. **NuxtLink in Header** — Replace `href="#about"` with `<NuxtLink to="/about">`. Remove scroll-spy `IntersectionObserver` logic from `Header.vue` since page navigation replaces same-page scrolling.

4. **About Us page content** — `pages/about.vue` imports `AboutUs` component which holds company description and differentiator cards. The component lives in `app/components/sections/about/AboutUs.vue`.

5. **Services page content** — `pages/services.vue` imports `Services` component with service category cards. Lives in `app/components/sections/services/Services.vue`.

6. **Home page content** — `pages/index.vue` keeps Hero + Process. Projects, Team, Contact remain on their current components but will move to their own pages in a future change.

7. **Visual consistency** — All pages follow existing dark theme: dark backgrounds, primary orange accent, `animate-fadeInUp` entrance animations, responsive grids.

## Risks / Trade-offs

- **Content accuracy** — About Us copy from request.md may need client review.
- **Partial migration** — Only Home, About Us, and Services become pages now. Projects, Team, Contact remain on Home temporarily. This creates a transitional state.
- **Scroll-spy removal** — Users lose visual active-section feedback in nav. Each page gets its own `<title>` and meta tags instead (better for SEO).
