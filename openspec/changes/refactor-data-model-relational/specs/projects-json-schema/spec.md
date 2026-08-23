## Capability

20 real mock projects with relational references to services

## Behavior

The `assets/projects.json` file contains a flat array of 20 construction projects, each representing a real (mocked) job with specific name, location, year, and service association. Projects reference services via `serviceId` (foreign key) and optionally include Preconstruction Management via boolean flag.

### Schema

```typescript
{
  "projects": [
    {
      id: number,                    // Unique, non-sequential (1, 8, 3, 15...)
      name: string,                  // Specific project name (e.g., "Coral Gables Modern Estate")
      serviceId: string,             // FK to services.json leaf node id
      includesPreConstruction: boolean,
      location: string,              // Specific city/neighborhood (e.g., "Coral Gables, FL")
      year: number,                  // Completion year (2021-2025)
      description: string,           // 1-2 sentence project description
      coverImage: string,            // Relative path from /public/ (e.g., "/Final Pics/.../1.jpg")
      status: string                 // 'completed' | 'in-progress' | 'planned'
    }
  ]
}
```

### Distribution

- **4 projects per service** (5 services × 4 = 20 projects)
  - new-construction: 4 projects
  - renovation-projects: 4 projects
  - general-commercial: 4 projects
  - medical-facilities: 4 projects
  - concrete-restoration: 4 projects

- **IDs**: Non-sequential pattern (1, 8, 3, 15, 7, 12, 2, 11, 5, 18, 4, 9, 16, 20, 6, 13, 10, 17, 14, 19)
- **Years**: Mixed (2021-2025), not chronological per service
- **Preconstruction**: ~50% true, ~50% false (random distribution)
- **Status**: Mostly 'completed', some 'in-progress', rare 'planned'

### Locations (Miami Area)

Vary across: Coral Gables, Brickell, Key Biscayne, Coconut Grove, Aventura, South Beach/Miami Beach, Downtown Miami, Wynwood, Doral, Pinecrest, Kendall, Sunny Isles Beach, Bal Harbour, Hallandale Beach, Miami Airport area

### Cover Images

Each project uses one image from the existing `/public/Final Pics/` directories:
- Residential Project/New Construction/
- Residential Project/General Renovation/
- Commercial Projects/General Commercial/
- Commercial Projects/Concrete Restoration & Waterproofing/

Medical Facilities projects reuse images from General Commercial pool (no dedicated folder yet).

## Data Flow

`assets/projects.json` → `useProjects()` composable (joins with services + galleries) → Project components (ProjectCard, project detail page)

The composable auto-joins:
- `project.service` → ServiceNode from useServices()
- `project.gallery` → Gallery from useGalleries()

## Dependencies

- `assets/services.json` (for serviceId foreign key validation)
- `assets/galleries.json` (one gallery per project)

## Constraints

- All `serviceId` values must match a leaf service in services.json
- All `coverImage` paths must exist in `/public/`
- `year` must be 2010-2026 (realistic range)
- `status` must be one of: 'completed', 'in-progress', 'planned'
- `location` should end with ", FL" (Florida-based company)
