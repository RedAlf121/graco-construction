## Capability

Relational data loading with joins between services, projects, and galleries

## Behavior

Three composables work together to provide relational data access:

### useServices()

Returns services hierarchy and lookup utilities.

**Interface:**
```typescript
interface ServiceNode {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  category?: 'residential' | 'commercial';
  children?: ServiceNode[];
}

function useServices() {
  servicesTree: ServiceNode[];
  servicesFlat: ComputedRef<Record<string, ServiceNode>>;
  getLeafServices: () => ServiceNode[];
  getServicePath: (serviceId: string) => string[];
  getServiceHref: (serviceId: string) => string;
}
```

**Changes from current:**
- Added `slug` field to interface
- Added `category` field to interface
- `servicesFlat` now indexes by both `id` and `slug`
- New method: `getLeafServices()` returns only services with no children
- Updated `getServiceHref()` to return `/services/${slug}/projects`

---

### useProjects()

Returns projects with auto-joined service and gallery data.

**Interface:**
```typescript
interface Project {
  id: number;
  name: string;
  serviceId: string;
  includesPreConstruction: boolean;
  location: string;
  year: number;
  description: string;
  coverImage: string;
  status: 'completed' | 'in-progress' | 'planned';
  // Auto-joined fields
  service?: ServiceNode;
  gallery?: Gallery;
}

function useProjects() {
  projects: ComputedRef<Project[]>;
  getById: (id: number | string) => Project | undefined;
  getByService: (serviceId: string) => Project[];
  getByCategory: (category: 'residential' | 'commercial') => Project[];
  getWithPreConstruction: () => Project[];
}
```

**Changes from current:**
- Complete refactor from array return to object with methods
- Interface fields changed (name, serviceId, location, year, etc.)
- Auto-joins `service` and `gallery` via computed
- New methods: `getById`, `getByService`, `getByCategory`, `getWithPreConstruction`

**Join Logic:**
```typescript
const { servicesFlat } = useServices();
const { galleries } = useGalleries();

const projects = computed(() => {
  return projectsData.projects.map(project => ({
    ...project,
    service: servicesFlat.value[project.serviceId],
    gallery: galleries.value.find(g => g.projectId === project.id)
  }));
});
```

---

### useGalleries()

Returns image galleries linked by projectId.

**Interface:**
```typescript
interface Gallery {
  id: number;
  projectId: number;  // Changed from serviceId
  images: string[];
}

function useGalleries() {
  galleries: Ref<Gallery[]>;
  getByProjectId: (projectId: number) => Gallery | undefined;
}
```

**Changes from current:**
- Changed field `serviceId` to `projectId`
- Removed unused fields from interface (slug, service, icon, cover, count)
- Method renamed: `getBySlug()` → `getByProjectId()`

## Data Flow

```
1. Component calls useProjects()
2. useProjects() internally calls useServices() and useGalleries()
3. useProjects() returns projects with auto-joined service + gallery
4. Component accesses project.service.name, project.gallery.images, etc.
```

## Dependencies

- `assets/services.json`
- `assets/projects.json`
- `assets/galleries.json`

## Constraints

- All composables must be called within Vue setup context
- Joins are computed reactively (updates if underlying data changes)
- TypeScript types must be exported for use in components
- No Pinia or global store (local state only, per project conventions)
