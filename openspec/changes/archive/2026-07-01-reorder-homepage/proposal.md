## Why

The current homepage order (Hero → CompanyDescription → Process → ProjectsPreview) buries the project portfolio at the bottom. Visitors should see our work first to build immediate credibility, then learn about the company, then understand our process. This reorder aligns with conversion-focused landing page patterns.

## What Changes

- Reorder homepage sections in `app/pages/index.vue` to: Hero → ProjectsPreview → CompanyDescription → Process
- Update CompanyDescription tagline from "Built to Deliver" to "Design. Build. Deliver."
- Remove the description paragraph from CompanyDescription (keep only tagline + 3 stat cards)

## Capabilities

### New Capabilities
- `homepage-reorder`: Homepage section order and CompanyDescription content updates

### Modified Capabilities
- (none — no existing main specs to modify)

## Impact

- Modified files: `app/pages/index.vue`, `app/components/sections/home/CompanyDescription.vue`
- No new dependencies, no backend changes, no data model changes
- Dark mode: no impact (uses existing design tokens)
- Multi-page architecture: no impact (only affects current index.vue)