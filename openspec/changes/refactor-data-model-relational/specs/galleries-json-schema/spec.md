## Capability

Image galleries linked to projects via projectId

## Behavior

The `assets/galleries.json` file contains a flat array of 20 gallery entries, each linked to exactly one project via `projectId` (foreign key). Each gallery holds exactly 4 image paths from the `/public/Final Pics/` pool.

### Schema

```typescript
{
  "galleries": [
    {
      id: number,           // Unique, matches project ID for simplicity
      projectId: number,    // FK to projects.json
      images: string[]      // Array of 4 paths (e.g., "/Final Pics/.../1.jpg")
    }
  ]
}
```

### Rules

- **Cardinality**: 1 gallery per project (1:1 relationship)
- **Image count**: Exactly 4 images per gallery
- **Image sources**: Reuse existing images from:
  - `/Final Pics/Residential Project/New Construction/` (15 images)
  - `/Final Pics/Residential Project/General Renovation/` (30 images)
  - `/Final Pics/Commercial Projects/General Commercial/` (32 images)
  - `/Final Pics/Commercial Projects/Concrete Restoration & Waterproofing/` (34 images)

### "Desorganizado" Pattern

Images are selected in a mixed/random pattern across the pool, not sequentially. For example, a New Construction project might use images 1, 5, 9, 12 instead of 1, 2, 3, 4.

### Example

```json
{
  "id": 1,
  "projectId": 1,
  "images": [
    "/Final Pics/Residential Project/New Construction/1.jpg",
    "/Final Pics/Residential Project/New Construction/5.jpg",
    "/Final Pics/Residential Project/New Construction/9.jpg",
    "/Final Pics/Residential Project/New Construction/12.jpg"
  ]
}
```

## Data Flow

`assets/galleries.json` → `useGalleries()` composable → Joined into `project.gallery` by `useProjects()` → Rendered in ProjectCard, ModalGallery

## Dependencies

- `assets/projects.json` (for projectId foreign key validation)
- `/public/Final Pics/` directory structure

## Constraints

- All `projectId` values must match a project in projects.json
- All image paths must exist in `/public/`
- Images must have extensions: .jpg, .jpeg, .JPG, .JPEG, .png, .jfif, .HEIC
- Exactly 4 images per gallery (no more, no less)
- Gallery `id` and `projectId` can match (simplifies implementation)
