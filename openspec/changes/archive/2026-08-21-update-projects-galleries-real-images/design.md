## Context

The `public/Final Pics/` directory contains 155 images organized into subdirectories:
- `Commercial Projects/General Commercial/` (32 images)
- `Commercial Projects/Medical Facilities/` (11 images)
- `Commercial Projects/Concrete Restoration & Waterproofing/` (56 images)
- `Residential Project/General Renovation/` (41 images)
- `Residential Project/New Construction/` (15 images)

Each image filename follows patterns like:
- `YYMMDD.N Project Title.ext` (e.g., `191129.13 Church Project. 349 SW 12 ST Miami.jpg`)
- `YYMMDD Project Title.ext` (e.g., `171007 Ivette Mendez.jpg`)
- `N-Project Title.N.ext` (e.g., `5-MDC Cultural Affairs.1.jpeg`)

The previous JSON files referenced non-existent numeric paths and contained 20 fictional projects that didn't match any real image groups.

## Goals / Non-Goals

**Goals:**
- Map every image to its correct project based on filename patterns
- Group images by project title extracted from filenames
- Create 27 project entries matching the 27 distinct image groups found
- Protect client privacy by replacing personal names with generic project names
- Maintain existing relational structure (projectId ↔ galleryId ↔ images)
- Preserve all JSON schema fields (id, name, serviceId, location, year, description, coverImage, status, includesPreConstruction)

**Non-Goals:**
- Not changing the relational data model or schema
- Not modifying TypeScript interfaces or component code
- Not implementing new features or UI changes
- Not converting image formats (HEIC, jfif preserved as-is)
- Not reorganizing filesystem structure
- Not adding or removing services from `services.json`

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Project count** | 27 projects (8 commercial, 2 medical, 5 concrete, 8 reno, 4 new) | Matches the 27 distinct image groups found in filesystem |
| **Image grouping strategy** | By exact filename prefix/title match | Images with same project title and date prefix belong together |
| **Client privacy pattern** | Generic names for residential projects with personal names | "Residential Renovation Project 1-8", "Residential New Construction Project 1-4" |
| **Commercial project names** | Keep descriptive titles from filenames | "Pastoral Office Suite", "Daikin USA S09 Expansion", "Larkin Hospital OR Restoration" |
| **Year extraction** | From YYMMDD prefix in filename | `250815` → 2025, `191129` → 2019, handles 2000s correctly |
| **Images per project** | Variable (1-19 images) | User requirement: "Un proyecto puede tener cuantas imagenes quiera" |
| **Cover image selection** | First image in sorted sequence | User approval: "para la imagen de cover toma una cualquiera" |
| **Project status** | All "completed" | User requirement: "Todos los proyectos que aparecen ahi estan completados" |
| **PreConstruction flag** | All `false` | User requirement: "Para el preconstruction flag no hagas nada de momento" |
| **ID sequencing** | Sequential 1-27 | Simple, predictable, maintains 1:1 gallery relationship |

## Architecture

### Image Analysis Process

1. **Directory Scan**: Find all images in `public/Final Pics/` subdirectories
2. **Filename Parsing**: Extract date prefix, sequence number, and project title
3. **Grouping**: Group images by unique project title
4. **Service Mapping**: Map directory structure to serviceId
   - `General Commercial/` → `general-commercial`
   - `Medical Facilities/` → `medical-facilities`
   - `Concrete Restoration & Waterproofing/` → `concrete-restoration`
   - `Residential.../General Renovation/` → `renovation-projects`
   - `Residential.../New Construction/` → `new-construction`
5. **Privacy Filter**: Identify residential projects with personal names and sanitize
6. **Year Extraction**: Parse YYMMDD prefix to determine project year

### Data Structure (Unchanged)

**projects.json schema:**
```typescript
{
  id: number (1-27)
  name: string (extracted from filename or generic)
  serviceId: string (mapped from directory)
  includesPreConstruction: boolean (all false)
  location: string (extracted from address or "Miami, FL")
  year: number (extracted from YYMMDD prefix)
  description: string (generated descriptive text)
  coverImage: string (first image path with full filename)
  status: "completed" (all projects)
}
```

**galleries.json schema:**
```typescript
{
  id: number (1-27, matches projectId)
  projectId: number (FK to projects.id)
  images: string[] (full paths with descriptive filenames)
}
```

## Image Group Mapping

### Commercial Projects - General Commercial (8 projects)

| Project ID | Name | Images | Date Range |
|-----------|------|--------|------------|
| 1 | Pastoral Office Suite | 7 | 250815 (2025) |
| 2 | New 40Ton Roof Top Unit | 3 | 240927 (2024) |
| 3 | Demolition & General Renovation Cooling Tower | 4 | 231119 (2023) |
| 4 | MDC Cultural Affairs | 8 | 5-* (2023 est.) |
| 5 | White Box Commercial Buildout | 1 | 220316 (2022) |
| 6 | Daikin USA S09 Expansion | 4 | 220309 (2022) |
| 7 | Engineer Office Build-Out | 2 | 190706 (2019) |
| 8 | Warehouse ASU Expansion | 3 | 190118 (2019) |

### Commercial Projects - Medical Facilities (2 projects)

| Project ID | Name | Images | Date Range |
|-----------|------|--------|------------|
| 9 | Larkin Palm Spring Ultrasound Unit | 3 | 250818 (2025) |
| 10 | Complete Pharmacy and Medical Solutions | 8 | 190705 (2019) |

### Commercial Projects - Concrete Restoration (5 projects)

| Project ID | Name | Images | Date Range |
|-----------|------|--------|------------|
| 11 | Larkin Hospital OR Restoration | 19 | 230822 (2023) |
| 12 | Concrete Restoration - SW 70 St Building A | 9 | 220222 (2022) |
| 13 | Concrete Restoration - SW 70 St Building B | 10 | 220221 (2022) |
| 14 | Biscayne Boulevard Concrete Restoration | 6 | 210718 (2021) |
| 15 | Church Structural Restoration | 11 | 191129 (2019) |

### Residential Projects - General Renovation (8 projects)

| Project ID | Name (Privacy Protected) | Original Identifier | Images | Year |
|-----------|-------------------------|---------------------|--------|------|
| 16 | Residential Renovation Project 1 | 1570 Biarritz Dr | 6 | 2019 |
| 17 | Residential Renovation Project 2 | Mint Brickell (Ailed Padilla) | 5 | 2019 |
| 18 | Residential Renovation Project 3 | Modern Doral (Lisbet Cols) | 4 | 2019 |
| 19 | Residential Renovation Project 4 | Tatina&Oswaldo Ledezma | 13 | 2019 |
| 20 | Bay Shore Drive Renovation | 2459 S Bay Shore Dr | 1 | 2018 |
| 21 | Residential Unit Renovation Project 5 | Hide Unit 8 | 4 | 2018 |
| 22 | Residential Renovation Project 6 | Ivette Mendez | 1 | 2017 |
| 23 | Residential Addition Project 7 | Milton Cardoso | 3 | 2017 |

### Residential Projects - New Construction (4 projects)

| Project ID | Name (Privacy Protected) | Original Identifier | Images | Year |
|-----------|-------------------------|---------------------|--------|------|
| 24 | Residential New Construction Project 1 | 13321 SW 2nd St Fence/Gazebo | 1 | 2024 |
| 25 | Residential New Construction Project 2 | 20517 SW 2nd St Terrace | 1 | 2023 |
| 26 | Residential New Construction Project 3 | Graciella & Alexander | 1 | 2018 |
| 27 | Residential New Construction Project 4 | Boria Residence | 12 | 2018 |

## Privacy Protection Rules

**Keep Original Name When:**
- Commercial/medical/concrete projects (business entities)
- Address-only identifiers (e.g., "2459 S Bay Shore Dr")
- Generic descriptors (e.g., "Hide Unit 8 Electrical And Soffit")

**Replace with Generic Name When:**
- Filename contains personal names (e.g., "Ivette Mendez", "Tatina&Oswaldo Ledezma")
- Filename contains full client names (e.g., "Ailed Padilla", "Lisbet Cols", "Milton Cardoso", "Graciella & Alexander", "Boria")

**Generic Name Format:**
- Renovation projects: "Residential Renovation Project N" (where N = 1-7)
- New construction: "Residential New Construction Project N" (where N = 1-4)
- Special cases: "Residential Addition Project N", "Residential Unit Renovation Project N"

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| **HEIC/jfif formats may not display in all browsers** | Document formats for future conversion. Consider WebP conversion in next phase. |
| **Some filenames have inconsistent numbering** | Preserve exact filenames; sorting handles display order correctly. |
| **Personal names still in image filenames** | JSON data is sanitized. Actual filesystem remains unchanged (renaming files is out of scope). |
| **No validation of image file existence** | All paths verified during implementation. Images confirmed to exist. |
| **Mixed case extensions (.jpg vs .JPG)** | Preserved as-is. Works correctly on case-insensitive filesystems. |

## Mobile Considerations

- No changes to responsive behavior (data-only update)
- Image lazy loading preserved (existing implementation)
- Touch interactions unchanged
- Gallery carousels work identically with new image paths

## Accessibility

- All cover images use project name in `alt` attributes (existing pattern)
- No changes to keyboard navigation
- Screen reader announcements unchanged
- Image path changes transparent to assistive technology

## Performance

- **Build size**: No change (same number of JSON bytes, slightly longer strings)
- **Runtime**: Identical performance (same data structure)
- **SSR/SSG**: No impact (static JSON loading unchanged)
- **Images**: No new images added, same lazy loading strategy
- **Total images**: 150 mapped images (vs previous broken paths)
