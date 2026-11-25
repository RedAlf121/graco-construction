## Context

The site currently hardcodes service data in two places — `Services.vue` (template HTML) and `Footer.vue` (script array) — while a third representation lives in `assets/categories.json` for project taxonomy. This means adding or modifying a service requires editing multiple files with different structures, and the representations have already drifted out of sync. The footer lists services (e.g., "Medical Facilities") that don't appear in the Services section, and vice versa.

The existing pattern for data-driven components already exists in the codebase: composables in `app/hooks/` load static JSON from `assets/` and expose reactive data. This design follows that same pattern.

## Goals / Non-Goals

**Goals:**
- Create a single `assets/services.json` as the authoritative source for the service hierarchy used in display components
- Create `app/hooks/useServices.ts` composable to load and expose the data
- Refactor `Services.vue` to render from the composable
- Refactor `Footer.vue` to render a tree-style service listing from the composable
- Update `assets/galleries.json` to reference service IDs instead of independent slug strings
- Ensure zero visual change — the UI should look identical after refactoring

**Non-Goals:**
- Not changing the project taxonomy in `categories.json` — that remains for portfolio filtering
- Not adding new services or changing the hierarchy — only preserving what `Services.vue` already shows
- Not creating individual service pages (`/services/:id`) — those come in a future change
- Not internationalization

## Decisions

### 1. New `services.json` separate from `categories.json`

`categories.json` is a project taxonomy (Design/Build tree for filtering portfolio projects). `services.json` is a marketing display hierarchy (Preconstruction Management / Construction Management with icons and descriptions). They serve different purposes and are kept separate. Cross-references between them (e.g., a service links to projects in that category) are handled at the component level via route links.

### 2. Service tree structure

Each node in the tree has:
- `id`: kebab-case unique identifier (also serves as route slug)
- `name`: Display name
- `description`: Only on top-level nodes (Preconstruction Management, Construction Management)
- `icon`: Font Awesome icon class
- `children`: Sub-services (Residential → New Construction, etc.)

Leaf nodes may have an `href` for the projects-filtered-by-service route. Intermediate nodes (Residential, Commercial) have no href — they are grouping labels.

### 3. Footer renders as a tree, not a flat list

The user requested a "directory tree" style in the footer. This means recursive `<ul>` rendering with indentation, showing the full hierarchy. The top-level label "Services" acts as the root.

### 4. Galleries reference services by `serviceId`

Currently `galleries.json` has independent `slug`, `parent`, `parentId`, `grandparent`, `grandparentId` strings. These are replaced with a single `serviceId` that matches the leaf service `id` in `services.json`. The composable resolves the hierarchy from the tree instead of storing redundant path strings.

### 5. TypeScript interface shared across composables

The `ServiceNode` interface is defined in `useServices.ts` and can be imported by any consumer. It mirrors the JSON structure but adds a `path` computed field for tree display.

## Data Model

```typescript
interface ServiceNode {
  id: string
  name: string
  description?: string
  icon?: string
  href?: string | null
  children?: ServiceNode[]
}
```

## Architecture Flow

```
assets/services.json  ──►  useServices() composable  ──►  Components
  (static data)              │                               │
                            ├── servicesTree                ├── Services.vue
                            │   (full hierarchy)            │   (v-for cards)
                            ├── servicesFlat                └── Footer.vue
                            │   (id→node lookup)                (recursive tree)
                            └── getServicePath(id)
                                (breadcrumb path array)
```

## Risks / Trade-offs

- **[Low] Data duplication**: `services.json` and `categories.json` both describe related but different aspects of the business. This is intentional — they serve different consumers. The risk is that someone might confuse the two and edit the wrong file. Mitigation: clear naming and a comment at the top of each file.
- **[Low] Footer tree depth**: If the hierarchy grows deep, the footer could become visually cluttered. Mitigation: limit indentation to 2-3 levels and use smaller font sizes for deeper levels.
- **[Low] Gallery migration**: Changing `galleries.json` slugs to `serviceId` may break any existing links that reference the old slug format. Mitigation: no external links exist yet (the site is a static SPA with no production deployment), so this is safe.
