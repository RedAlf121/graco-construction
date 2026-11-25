## Implementation Tasks

### Phase 1: Data Analysis ✅ COMPLETED
- [x] Scan `public/Final Pics/` directory structure
- [x] Identify all image files by format (.jpg, .jpeg, .png, .JPG, .HEIC, .jfif)
- [x] Count total images: 150+ images found
- [x] Group images by project title patterns
- [x] Identify 27 distinct project groups
- [x] Map directory structure to serviceId values
- [x] Extract dates from YYMMDD filename prefixes
- [x] Identify residential projects with client names requiring privacy protection

### Phase 2: Project JSON Generation ✅ COMPLETED
- [x] Create 27 project entries in `assets/projects.json`
- [x] Assign sequential IDs 1-27
- [x] Map each project to correct serviceId
  - [x] 8 projects → `general-commercial`
  - [x] 2 projects → `medical-facilities`
  - [x] 5 projects → `concrete-restoration`
  - [x] 8 projects → `renovation-projects`
  - [x] 4 projects → `new-construction`
- [x] Generate descriptive project names
  - [x] Keep commercial/medical/concrete names from filenames
  - [x] Replace residential personal names with generic "Residential Project N"
- [x] Extract and assign project years from date prefixes
- [x] Set all projects to `status: "completed"`
- [x] Set all `includesPreConstruction: false`
- [x] Generate location strings (addresses or "Miami, FL")
- [x] Write professional descriptions for each project
- [x] Assign cover images (first image of each group)

### Phase 3: Gallery JSON Generation ✅ COMPLETED
- [x] Create 27 gallery entries in `assets/galleries.json`
- [x] Assign sequential IDs 1-27 matching project IDs
- [x] Link each gallery to projectId (1:1 relationship)
- [x] Map all 150 images to correct galleries:
  - [x] Gallery 1 (Project 1): 7 images - Pastoral Office Suite
  - [x] Gallery 2 (Project 2): 3 images - New 40Ton Roof Top Unit
  - [x] Gallery 3 (Project 3): 4 images - Demolition & Cooling Tower
  - [x] Gallery 4 (Project 4): 8 images - MDC Cultural Affairs
  - [x] Gallery 5 (Project 5): 1 image - White Box Commercial
  - [x] Gallery 6 (Project 6): 4 images - Daikin USA S09 Expansion
  - [x] Gallery 7 (Project 7): 2 images - Engineer Office
  - [x] Gallery 8 (Project 8): 3 images - Warehouse ASU
  - [x] Gallery 9 (Project 9): 3 images - Larkin Ultrasound Unit
  - [x] Gallery 10 (Project 10): 8 images - Pharmacy & Medical Solutions
  - [x] Gallery 11 (Project 11): 19 images - Larkin Hospital OR
  - [x] Gallery 12 (Project 12): 9 images - Concrete 5996 SW 70 St
  - [x] Gallery 13 (Project 13): 10 images - Concrete 6140 SW 70 St
  - [x] Gallery 14 (Project 14): 6 images - Biscayne Blvd
  - [x] Gallery 15 (Project 15): 11 images - Church Project
  - [x] Gallery 16 (Project 16): 6 images - Res Reno 1
  - [x] Gallery 17 (Project 17): 5 images - Res Reno 2
  - [x] Gallery 18 (Project 18): 4 images - Res Reno 3
  - [x] Gallery 19 (Project 19): 13 images - Res Reno 4
  - [x] Gallery 20 (Project 20): 1 image - Bay Shore Dr
  - [x] Gallery 21 (Project 21): 4 images - Res Reno 5
  - [x] Gallery 22 (Project 22): 1 image - Res Reno 6
  - [x] Gallery 23 (Project 23): 3 images - Res Addition 7
  - [x] Gallery 24 (Project 24): 1 image - Res New 1
  - [x] Gallery 25 (Project 25): 1 image - Res New 2
  - [x] Gallery 26 (Project 26): 1 image - Res New 3
  - [x] Gallery 27 (Project 27): 12 images - Res New 4
- [x] Use full descriptive filenames in image paths
- [x] Preserve all file extensions as-is (.HEIC, .jfif, etc.)

### Phase 4: Validation ✅ COMPLETED
- [x] Verify JSON structure is valid
- [x] Confirm all 27 projects have valid fields
- [x] Confirm all 27 galleries have valid projectId references
- [x] Verify total image count matches (150 images)
- [x] Test dev server starts without errors
- [x] Check that all image paths point to existing files

### Phase 5: Testing (Post-Implementation)
- [ ] Load homepage and verify no console errors
- [ ] Navigate to `/projects` page
- [ ] Verify all 27 projects display
- [ ] Click on individual project cards
- [ ] Verify project detail pages load with images
- [ ] Test navigation to `/services/[slug]/projects` routes
- [ ] Verify gallery images load correctly
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check mobile responsive views
- [ ] Verify HEIC images display warning (if applicable)

## Verification Commands

```bash
# Validate JSON syntax
node -e "require('./assets/projects.json')"
node -e "require('./assets/galleries.json')"

# Count projects and galleries
node -e "console.log('Projects:', require('./assets/projects.json').projects.length)"
node -e "console.log('Galleries:', require('./assets/galleries.json').galleries.length)"

# Verify all images mapped
node -e "const g = require('./assets/galleries.json'); console.log('Total images:', g.galleries.reduce((sum, gal) => sum + gal.images.length, 0))"

# Check all projects have required fields
node -e "const p = require('./assets/projects.json'); console.log('Valid:', p.projects.every(proj => proj.id && proj.name && proj.serviceId && proj.coverImage))"

# Start dev server
npm run dev
```

## Rollback Plan

If issues are discovered:
1. Revert `assets/projects.json` to previous version (20 fictional projects)
2. Revert `assets/galleries.json` to previous version
3. Debug specific image path issues
4. Re-run implementation with corrections

Previous versions available in git history:
```bash
git log --oneline assets/projects.json
git log --oneline assets/galleries.json
```
