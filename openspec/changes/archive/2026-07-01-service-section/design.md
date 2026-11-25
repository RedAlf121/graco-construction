## Context

Currently the home page (`index.vue`) shows a lightweight "Our Expertise" section via `ServicesPreview.vue` — two clickable cards (Residential, Commercial) that link to `/projects?category=...`. A separate `/services` page renders the full `Services.vue` component with a two-column layout showing both top-level categories and their sub-service items.

Both use hardcoded data (not driven by `categories.json` or `useCategories`). The "Our Expertise" preview and the full services page are functionally redundant — they present the same information at different depths.

## Goals / Non-Goals

**Goals:**
- Present a single, unified services section on the home page with full depth (categories + sub-items)
- Remove all dead code from the previous split approach
- Clean up navigation to reflect the consolidated structure
- Keep changes minimal — reuse existing components where possible

**Non-Goals:**
- No data model changes (still hardcoded, not wired to `categories.json`)
- No visual redesign of the Services component
- No new components
- No SEO restructuring beyond removing the `/services` page

## Decisions

**Reuse `Services.vue` as-is on the home page**
The component is already a self-contained section with `SectionHeader`, responsive grid, animations, and icon styling. It doesn't depend on its page context. Just import it in `index.vue` alongside the other sections.

**Delete `ServicesPreview.vue` entirely**
Dead code once the home page no longer references it. No other component imports it.

**Delete `app/pages/services.vue`**
It's a thin wrapper (13 lines) that imports and renders `Services.vue` + sets a page title. After moving the component to the home page, this page has no purpose.

**Remove `/services` from `Header.vue` navLinks**
With no page to link to, remove the entry from the `navLinks` array. The `icon: 'fa-project-diagram'` icon and title are both dropped. No replacement link needed — services content lives on the home page.

**SEO trade-off accepted**
The home page title is set by `index.vue` (currently no explicit `useHead` — it inherits the Nuxt default). Services sub-items won't have dedicated indexed pages. For a portfolio site this is acceptable; future SEO work can add deeper service landing pages if needed.

## Risks / Trade-offs

- **SEO loss**: `/services` page disappears from search engines → **Mitigation**: The home page content is the primary SEO target; in-page services section preserves keyword presence.
- **Broken bookmarks**: Anyone linking to `/services` gets a 404 → **Mitigation**: Low risk for a new site; Nuxt 404 page handles gracefully. Future option: add a client-side redirect.
- **Long home page**: Adding more content to `index.vue` increases page length → **Mitigation**: Users scroll naturally through sections; the services section is mid-page, below the fold.
