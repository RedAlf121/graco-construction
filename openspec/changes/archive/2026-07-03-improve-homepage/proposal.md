## Why

The current homepage lacks a company introduction and project preview, making it
feel incomplete and less engaging for first-time visitors. Several pages (projects,
team, contact) don't have a consistent dark background, creating visual inconsistency.
The team section would be more impactful on the About Us page, and the standalone
Team page can be deferred to a future milestone.

## What Changes

- Add a **Company Description** section to the homepage (tagline, short bio, key
  stats) for visitor engagement
- Add a **Projects Preview** section to the homepage (project image thumbnails +
  CTA button → `/projects`)
- Fix **dark background gradient** on all pages — add
  `bg-gradient-to-l from-background-secondary to-background-primary` to each
  page's `<main>` tag and remove redundant bgs from section components
- **Move team member cards** from the Team page into About Us (below differentiators)
- **Replace the `/team` page** with a "Coming Soon" placeholder
- Update **HeroButton** to rewrite anchor → `<NuxtLink to="/projects">`

## Capabilities

### New Capabilities
- `homepage-engagement`: Company description section and projects preview on the landing page to increase visitor engagement
- `page-backgrounds`: Consistent dark background applied to all pages via each page's `<main>` wrapper
- `team-about-restructure`: Team member cards displayed on the About Us page; `/team` page shows a "Coming Soon" placeholder

### Modified Capabilities
- (none — no existing main specs to modify)

## Impact

- New components: `app/components/sections/home/CompanyDescription.vue`, `app/components/sections/home/ProjectsPreview.vue`
- Modified components: `AboutUs.vue` (add team cards), `Services.vue` (remove redundant bg), `Hero.vue` (update path), `HeroButton.vue` (`<a>` → `<NuxtLink>`)
- Modified pages: `index.vue` (add sections), `about.vue` (add bg), `services.vue` (add bg), `projects.vue` (add bg), `team.vue` (replace content), `contact.vue` (add bg)
- No new dependencies, no backend changes, no data model changes