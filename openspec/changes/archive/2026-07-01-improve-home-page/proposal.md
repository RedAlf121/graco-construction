## Why

The current site is a single-page SPA where nav links scroll to anchor sections (`#about`, `#services`, etc.). The target architecture is multi-page: each nav link points to a real Nuxt page (`/about`, `/services`, etc.). This is critical for SEO — each page gets its own URL, meta tags, and crawlable content. The home page itself needs to represent the landing experience, while About Us and Services become standalone pages.

## What Changes

- Create Nuxt `pages/` directory with page files: `index.vue`, `about.vue`, `services.vue`
- Move About Us content to its own page (`/about`) instead of a section on home
- Move Services content to its own page (`/services`) instead of a section on home
- Update `<Header>` nav links from anchor `#` targets to `<NuxtLink>` page routes
- Remove scroll-spy logic from Header (no longer needed for same-page navigation)
- Home page (`/`) retains Hero and Process overview as its core content
- Adjust `app.vue` to use `<NuxtPage />` for page routing instead of assembling all sections

## Capabilities

### New Capabilities
- `about-us-page`: About Us page (`/about`) with company story, values, and differentiators
- `services-page`: Services page (`/services`) with service cards for each offering
- `page-routing`: Nuxt pages setup with `pages/` directory, `<NuxtPage />` in `app.vue`, and `<NuxtLink>` navigation

### Modified Capabilities
- (none — no existing specs to modify)

## Impact

- New `pages/` directory with `index.vue`, `about.vue`, `services.vue`
- `app/app.vue` rewired from section assembly to `<NuxtPage />` layout
- `app/components/header/Header.vue` — nav links change from `#anchor` to `<NuxtLink to="/path">`, scroll-spy removed
- New page components under `app/components/sections/about/` and `app/components/sections/services/`
- Existing sections (Process, Projects, Team, Contact) stay on their respective pages
- No new dependencies, no backend changes, no data model changes
