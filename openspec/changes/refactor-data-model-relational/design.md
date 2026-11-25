## Context

The current system uses `projects.json` to store what are actually service categories, not real projects. The `categories.json` file provides a Design/Build hierarchy that duplicates `services.json`. Gallery images are tied to services, not individual projects. This structure makes it impossible to showcase multiple real projects per service.

The composable `useCategories()` merges projects into a category tree, but this becomes unnecessary when we have a proper services → projects → galleries relational model.

## Goals / Non-Goals

**Goals:**
- Establish clear relational structure: Services (1) → Projects (N) → Galleries (1)
- Create 20 realistic mock projects (4 per service) with specific names, locations, years
- Add Medical Facilities service under Construction Management > Commercial
- Migrate routes from `/projects/service/[slug]` to `/services/[slug]/projects`
- Enable projects to optionally include Preconstruction Management via `includesPreConstruction` field
- Use existing images from `/public/Final Pics/` in a "desorganizado" (mixed/random) pattern
- Maintain type safety throughout the refactor

**Non-Goals:**
- Not creating new physical image files
- Not implementing project filtering UI (data structure supports it, but UI is future work)
- Not modifying the visual design of existing components (layout/styles preserved)
- Not adding new dependencies or libraries
- Not implementing backend/API (remains static JSON)

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Data model pattern** | Relational (foreign keys in JSON) | Mimics database design for future API migration. Clear separation of concerns. |
| **Project count** | 20 projects (4 per service × 5 services) | Enough variety to test filtering/grouping, small enough to manage manually. |
| **Medical Facilities images** | Reuse General Commercial pool | No dedicated images exist yet. Mix avoids empty galleries. |
| **Service slug format** | kebab-case matching existing IDs | Consistency with current `serviceId` values. SEO-friendly URLs. |
| **Projects.json ID pattern** | Non-sequential (1, 8, 3, 15...) | User requested "desorganizado" to simulate real-world data import. |
| **Gallery cardinality** | 1:1 with projects, exactly 4 images each | Simplifies implementation. Future can add multiple galleries per project. |
| **Route structure** | `/services/[slug]/projects` | Service-first pattern aligns with business domain. Allows future `/services/[slug]/team`, etc. |
| **Categories.json removal** | Delete file + composable | Redundant with services.json. Simplifies mental model. |
| **PreConstruction flag** | Boolean field `includesPreConstruction` | Simple for now. Can expand to detailed phases later. |

## Architecture

### Data Flow (Before)
```
assets/projects.json (4 "projects" = service categories)
  ↓
app/hooks/useProjects() → returns array
  ↓
app/hooks/useCategories() → merges projects into category tree
  ↓
app/components/sections/project/Projects.vue → renders categories
```

### Data Flow (After)
```
assets/services.json (5 leaf services)
  ↓
app/hooks/useServices() → returns tree + flat lookup
  ↓
assets/projects.json (20 real projects with serviceId FK)
  ↓
app/hooks/useProjects() → joins with services + galleries
  ↓
app/components/sections/project/Projects.vue → groups by service
```

### Relational Schema (JSON-based)

**services.json** (hierarchy tree)
```typescript
{
  id: string (PK)
  slug: string (unique, for URLs)
  name: string
  icon?: string
  category?: 'residential' | 'commercial'
  children?: ServiceNode[]
}
```

**projects.json** (flat list)
```typescript
{
  id: number (PK)
  name: string
  serviceId: string (FK → services.id)
  includesPreConstruction: boolean
  location: string
  year: number
  description: string
  coverImage: string (path to public/)
  status: 'completed' | 'in-progress' | 'planned'
}
```

**galleries.json** (flat list)
```typescript
{
  id: number (PK)
  projectId: number (FK → projects.id)
  images: string[] (paths to public/)
}
```

## Component Changes

### Projects.vue
**Before:**
```vue
const [categories] = useCategories();
<DesktopView :categories="categories" />
```

**After:**
```vue
const { getLeafServices } = useServices();
const { getByService } = useProjects();
const servicesWithProjects = computed(() => 
  getLeafServices().map(s => ({
    service: s,
    projects: getByService(s.id),
    count: getByService(s.id).length
  }))
);
<DesktopView :services="servicesWithProjects" />
```

### pages/projects/[id].vue
**Before:**
```typescript
const [projects] = useProjects();
const project = projects.find(p => p.id === id);
```

**After:**
```typescript
const { getById } = useProjects();
const project = getById(id);
// project.service is auto-joined ServiceNode
// project.gallery is auto-joined Gallery
```

### New: pages/services/[slug]/projects.vue
Lists all projects for a specific service. Includes breadcrumb back to `/projects`, service name/description header, and grid of `ProjectCard` components.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| **Breaking change to URLs** | Update all internal links in same PR. Set up redirects if site is already live. |
| **TypeScript errors during transition** | Implement in phases: data → composables → components. Run `npm run build` after each phase. |
| **HEIC image format in galleries** | Some images are `.HEIC` which may not render in all browsers. Document for future conversion to `.jpg`. |
| **Loss of categories.json structure** | Design/Build hierarchy is preserved in services.json. No functionality lost. |
| **Mock data feels artificial** | User explicitly requested "desorganizado" pattern. Real data can replace mocks later without schema changes. |
| **No referential integrity checks** | JSON doesn't enforce FKs. Add validation script or migrate to DB in future if needed. |

## Mobile Considerations

- Existing mobile breakpoints (850px nav, 1024px layout) are preserved
- `MobileView.vue` receives same data structure as `DesktopView.vue`, just different rendering
- Touch interactions and swipe behaviors (if any) remain unchanged
- Service selection dropdown (if present) now shows 5 services instead of 4

## Accessibility

- All `NuxtLink` elements maintain keyboard navigation
- Image `alt` text uses `project.name` for context
- Route changes announce via screen readers (Nuxt's built-in behavior)
- No new interactive elements introduced (preserves existing a11y)

## Performance

- **Build size**: No new dependencies, no size increase
- **Runtime**: Slightly more data (20 projects vs 4), but negligible impact (< 50KB JSON)
- **SSR/SSG**: No changes to rendering strategy
- **Images**: All lazy-loaded via existing `loading="lazy"` pattern
