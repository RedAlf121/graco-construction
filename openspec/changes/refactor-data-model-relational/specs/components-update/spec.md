## Capability

Components using new relational data structure

## Behavior

Six components require updates to work with the new services → projects → galleries model:

### 1. sections/project/Projects.vue

**Before:**
```vue
<script setup lang="ts">
import { useCategories } from '~/hooks/useCategories';
const [categories] = useCategories();
</script>
<template>
  <DesktopView :categories="categories" />
  <MobileView :categories="categories" />
</template>
```

**After:**
```vue
<script setup lang="ts">
import { useServices } from '~/hooks/useServices';
import { useProjects } from '~/hooks/useProjects';

const { getLeafServices } = useServices();
const { getByService } = useProjects();

const servicesWithProjects = computed(() => {
  return getLeafServices().map(service => ({
    service,
    projects: getByService(service.id),
    count: getByService(service.id).length
  }));
});
</script>
<template>
  <DesktopView :services="servicesWithProjects" />
  <MobileView :services="servicesWithProjects" />
</template>
```

---

### 2. sections/project/DesktopView.vue

**Props change:**
```typescript
// Before
interface Props {
  categories: CategoryNode[];
}

// After
interface Props {
  services: Array<{
    service: ServiceNode;
    projects: Project[];
    count: number;
  }>;
}
```

**Template updates:**
- Iterate over `services` instead of `categories`
- Access `service.service.name` instead of `category.name`
- Access `service.projects` instead of `category.projects`

---

### 3. sections/project/MobileView.vue

Same changes as DesktopView.vue.

---

### 4. sections/project/ProjectCard.vue

**Props:**
```typescript
interface Props {
  project: Project;  // New structure with auto-joined service + gallery
}
```

**Template updates:**
- `project.service` is now `ServiceNode` object, use `project.service.name`
- `project.gallery` is now `Gallery` object, use `project.gallery.images`
- Update image src from `project.coverImage` (still works)
- Update project title from `project.title` to `project.name`

---

### 5. sections/project/MobileCategorySelect.vue

**Props:**
```typescript
// Before
interface Props {
  categories: CategoryNode[];
}

// After
interface Props {
  services: ServiceNode[];  // Or same nested structure as DesktopView
}
```

**Logic:**
- Update dropdown options to iterate over services
- Update selection handler to emit service instead of category

---

### 6. sections/project/ModalGallery.vue

**Props:**
```typescript
interface Props {
  project: Project;
}
```

**Template:**
- Access images via `project.gallery.images` instead of `project.gallery` (which was array before)

## Data Flow (Example: User clicks service card)

```
1. User clicks card in Projects section
2. Navigates to /services/new-construction/projects
3. Page loads service by slug via useServices()
4. Page loads projects via useProjects().getByService('new-construction')
5. Returns 4 projects with auto-joined service + gallery data
6. ProjectCard receives full project object
7. Renders project.name, project.service.name, project.coverImage
8. On click, navigates to /projects/{id}
9. Project detail page loads via useProjects().getById(id)
10. Renders project details + gallery images
```

## Dependencies

- Updated composables (useServices, useProjects, useGalleries)
- Updated TypeScript interfaces (ServiceNode, Project, Gallery)

## Constraints

- All components must use Composition API (`<script setup lang="ts">`)
- Dark mode classes preserved (no visual changes)
- Tailwind utility classes preserved (no layout changes)
- Animations preserved (`animate-fadeInUp`, delay classes)
- Mobile breakpoints respected (850px, 1024px)
