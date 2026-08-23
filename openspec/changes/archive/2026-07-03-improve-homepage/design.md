## Context

Current homepage has Hero (full-screen video + logo) and Process (3 cards). About Us has company description + 6 differentiator cards. Services has 6 service cards. Projects, Team, and Contact pages exist but lack consistent dark backgrounds. The Team page has 6 member image cards. Hero has a "Projects" button linking to broken `#projects` anchor.

## Goals / Non-Goals

**Goals:**
- Add company description + projects preview to homepage
- Consistent dark gradient background on all pages
- Team members visible on About Us page
- `/team` page shows "Coming Soon"
- Hero button links to `/projects` via NuxtLink

**Non-Goals:**
- No new data models or JSON files
- No i18n
- No project detail pages (future)
- No CMS/backend integration

## Decisions

### 1. Background ownership: page `<main>` over section components
**Rationale:** Sections (AboutUs, Services, Process, Projects, Team, Contact) become pure content — reusable, no styling opinion. Each page sets `bg-gradient-to-l from-background-secondary to-background-primary` on its `<main>`. This is cleaner than adding bg to every section and matches the existing index.vue pattern.

**Alternative considered:** Keep bg on sections. Rejected — leads to duplication (AboutUs and Services already have it; Projects/Team/Contact would need it added).

### 2. Company Description as new `sections/home/CompanyDescription.vue`
**Rationale:** Home-specific content, distinct from About Us page. Uses existing design tokens: `bg-background-tertiary` cards, `animate-fadeInUp`, primary orange accents.

### 3. Projects Preview as new `sections/home/ProjectsPreview.vue`
**Rationale:** Shows 3 project images from `projects.json` (1 residential design, 1 commercial design, 1 residential build) in a 3-col grid. CTA button uses primary gradient + `shadow-button-primary`.

### 4. Team cards on About Us page
**Rationale:** Reuse existing `TeamCard.vue` component. Add SectionHeader "Our Team" below differentiators. Grid: 1 col mobile, 2 col tablet, 3 col desktop. Staggered `animate-fadeInUp` delays.

### 5. `/team` page → "Coming Soon"
**Rationale:** Simple placeholder. Minimal code. Can expand later with roles, bios, photos.

### 6. HeroButton → `<NuxtLink>`
**Rationale:** Client-side navigation, no full reload. Change `<a :href="path">` to `<NuxtLink :to="path">` preserving all styling classes.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Background on `<main>` might conflict if sections already have bg | Remove bg classes from AboutUs.vue and Services.vue sections |
| TeamCard designed for Team page grid — may need spacing tweaks on About Us | Test at all breakpoints; adjust gap/padding if needed |
| ProjectsPreview uses static selection from projects.json | Acceptable for now; dynamic selection can be added later |
| HeroButton `<NuxtLink>` loses `href` attribute in SSR HTML | NuxtLink renders as `<a>` in final HTML; SEO preserved |