## Why

Three disconnected representations of the service hierarchy exist — `Services.vue` (hardcoded HTML), `Footer.vue` (hardcoded array), and `categories.json` (project taxonomy with different structure). Adding a new service requires editing multiple files in different formats, and the footer's service list has already drifted out of sync with what the Services section shows. This change establishes a single `services.json` data file as the authoritative source for service display, so all components read from one place and updates propagate automatically.

## What Changes

- **New** `assets/services.json` — hierarchical tree of services with id, name, description, icon, and children
- **New** `app/hooks/useServices.ts` — composable that loads `services.json` and exposes the tree and flat lookup utilities
- **Refactor** `app/components/sections/services/Services.vue` — replace hardcoded HTML with `v-for` rendering driven by `useServices`
- **Refactor** `app/components/Footer.vue` — replace hardcoded services array with tree/directory-style rendering from `useServices`
- **Update** `assets/galleries.json` — replace independent slug/parent/grandparent strings with `serviceId` references to `services.json` IDs
- **Update** `app/hooks/useGalleries.ts` — resolve gallery-service relationships via `serviceId` instead of string matching

No breaking changes. The visible UI stays the same — only the data source changes internally.

## Capabilities

### New Capabilities
- `service-hierarchy`: Centralized service tree with metadata (icons, descriptions) for display across components

### Modified Capabilities

*(No existing specs are being changed. This is a new capability within the existing codebase.)*

## Impact

| File | Change |
|------|--------|
| `assets/services.json` | **Created** — new source-of-truth file |
| `app/hooks/useServices.ts` | **Created** — new composable |
| `app/components/sections/services/Services.vue` | **Refactored** — data-driven from composable |
| `app/components/Footer.vue` | **Refactored** — tree rendering from composable |
| `assets/galleries.json` | **Updated** — `serviceId` replaces slug/parent/grandparent |
| `app/hooks/useGalleries.ts` | **Updated** — resolves via serviceId |
