## Capability

Services hierarchy with Medical Facilities and URL-friendly slugs

## Behavior

The `assets/services.json` file defines a hierarchical tree of construction services. Each node has an `id`, `name`, optional `slug` for URL routing, optional `icon` (Font Awesome class), optional `category` for leaf nodes ('residential' | 'commercial'), and optional `children` array for nested services.

### Hierarchy Structure

```
Preconstruction Management (leaf, no children)

Construction Management (parent)
├─ Residential (parent)
│  ├─ New Construction (leaf, category: residential)
│  └─ Renovation Projects (leaf, category: residential)
└─ Commercial (parent)
   ├─ General Commercial (leaf, category: commercial)
   ├─ Medical Facilities (leaf, category: commercial) ← NEW
   └─ Concrete Restoration & Waterproofing (leaf, category: commercial)
```

### Field Requirements

- `id` (string, required, unique): Identifier for programmatic lookup
- `name` (string, required): Display name
- `slug` (string, required): URL-safe kebab-case identifier
- `description` (string, optional): Service description
- `icon` (string, optional): Font Awesome class (e.g., "fa-hospital")
- `category` (string, optional, enum): 'residential' | 'commercial' (leaf nodes only)
- `children` (array, optional): Nested ServiceNode objects

### Medical Facilities

- `id`: "medical-facilities"
- `slug`: "medical-facilities"
- `name`: "Medical Facilities"
- `icon`: "fa-hospital"
- `category`: "commercial"
- `description`: "Specialized healthcare construction including clinics, medical offices, and outpatient facilities with compliance to medical building codes."

## Data Flow

`assets/services.json` → `useServices()` composable → Components (Footer, Services, Projects)

The composable provides:
- `servicesTree`: Full hierarchical structure
- `servicesFlat`: Flat lookup by id or slug
- `getLeafServices()`: Returns only services without children (5 items)
- `getServicePath(id)`: Returns breadcrumb path as string array
- `getServiceHref(id)`: Returns URL `/services/{slug}/projects`

## Dependencies

- Font Awesome 6.4.0 (for icons)
- No other dependencies

## Constraints

- Slugs must be kebab-case, unique, and URL-safe
- Category field only appears on leaf nodes (services with no children)
- Medical Facilities must appear under Construction Management > Commercial
- Total leaf services: 5 (new-construction, renovation-projects, general-commercial, medical-facilities, concrete-restoration)
