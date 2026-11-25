## Why

The "Our Expertise" section on the home page and the full Services page present the same service categories (Residential, Commercial) at different detail levels — the former is a 2-card preview linking to projects, the latter is a full breakdown with sub-items. This creates redundancy and fragments the user experience. Consolidating into a single full-depth services section on the home page eliminates duplication, keeps users on the primary landing page, and removes an unnecessary page.

## What Changes

- Replace `ServicesPreview.vue` ("Our Expertise") on the home page with the full `Services.vue` component
- Delete `ServicesPreview.vue` (dead code)
- Delete the standalone `/services` page (`app/pages/services.vue`)
- Remove the "Services" link from the nav (`Header.vue`)
- No other CTAs reference `/services` — no further cleanup needed

## Capabilities

### New Capabilities

- `home-services-section`: Full-depth services listing (Residential + Commercial with sub-items) displayed as a section on the home page
- `site-navigation`: Updated navigation bar with the Services link removed

### Modified Capabilities

*(none — no existing specs to modify)*

## Impact

- **Deleted files**: `app/components/sections/home/ServicesPreview.vue`, `app/pages/services.vue`
- **Edited files**: `app/pages/index.vue` (swap import + template), `app/components/header/Header.vue` (remove nav link)
- **Unchanged**: `app/components/sections/services/Services.vue` (reused as-is on home page)
- **No dependency changes, new packages, or data model changes**
