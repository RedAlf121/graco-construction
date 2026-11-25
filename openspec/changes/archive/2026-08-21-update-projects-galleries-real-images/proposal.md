## Why

The image files in `public/Final Pics/` were renamed to include project titles and dates (e.g., `191129.13 Church Project. 349 SW 12 ST Miami.jpg`, `250815.1 Pastoral Office Suite.jpg`), but the JSON data files (`projects.json` and `galleries.json`) still referenced the old numeric naming system (e.g., `/Final Pics/.../1.jpg`, `/Final Pics/.../2.jpg`). This created a disconnect where the website couldn't load any images because the paths didn't match the actual files.

Additionally, the existing 20 projects in the JSON were fictional placeholders (e.g., "Coral Gables Modern Estate", "Key Biscayne Waterfront Villa") that didn't correspond to the real project images available in the filesystem.

## What Changes

### Data Files
- **Replace** `assets/projects.json` with 27 real projects based on actual image filenames
- **Replace** `assets/galleries.json` with 27 galleries referencing all 150+ real image files
- Extract project titles from image filenames using keyword matching
- Protect client privacy: residential projects with personal names get generic names (e.g., "Residential Renovation Project 1")

### Image Path Updates
- Update all image paths from old numeric format (`/Final Pics/.../1.jpg`) to new descriptive format (`/Final Pics/.../250815.1 Pastoral Office Suite.jpg`)
- Maintain full filename structure including dates and project titles
- Support all image formats found: `.jpg`, `.jpeg`, `.png`, `.JPG`, `.HEIC`, `.jfif`

### Project Distribution
- **General Commercial**: 8 projects (MDC Cultural Affairs, Pastoral Office Suite, Daikin USA S09 Expansion, etc.)
- **Medical Facilities**: 2 projects (Larkin Palm Spring Ultrasound Unit, Complete Pharmacy and Medical Solutions)
- **Concrete Restoration**: 5 projects (Larkin Hospital OR Restoration, Church Structural Restoration, SW 70 St buildings, Biscayne Blvd)
- **Residential Renovation**: 8 projects (generic names protecting client identities)
- **Residential New Construction**: 4 projects (generic names protecting client identities)

## Capabilities

### New Capabilities
- `real-project-mapping`: 27 projects mapped from actual image file groups
- `client-privacy-protection`: Residential project names sanitized to remove personal information
- `flexible-image-count`: Projects can have any number of images (1-19 per project)
- `date-extraction`: Project years extracted from YYMMDD date prefixes in filenames

### Modified Capabilities
- `projects-json-schema`: Expanded from 20 to 27 projects with real names and locations
- `galleries-json-schema`: All 150+ images mapped to correct projects with full filenames
- `image-path-structure`: Paths now include complete descriptive filenames

## Impact

- **Files modified**: `assets/projects.json`, `assets/galleries.json`
- **Files created**: None (data update only)
- **Files removed**: None
- **Breaking changes**: None (relational structure preserved, only data content changed)
- **Total images mapped**: 150 images across 27 projects
- **Project ID range**: 1-27 (sequential)
- **Gallery ID range**: 1-27 (1:1 relationship with projects maintained)

## Scope

### In Scope
- Complete replacement of fictional project data with real project information
- Mapping all 150+ images from `public/Final Pics/` to correct projects
- Client name protection for residential projects
- Maintaining all existing JSON schema fields and structure
- Cover image selection (first image of each project group)
- All projects marked as "completed" status

### Non-Goals
- Not modifying component code or composables (data structure unchanged)
- Not changing URL routing or page structure
- Not creating new image files or converting formats
- Not implementing image optimization or lazy loading (already exists)
- Not adding preconstruction flags (left as `false` for all projects)
- Not modifying service definitions in `services.json`
- Not implementing project filtering UI
