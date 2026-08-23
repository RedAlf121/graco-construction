## Capability

New /services/[slug]/projects route pattern

## Behavior

Migrate from `/projects/service/[slug]` to `/services/[slug]/projects` for better semantic routing and future extensibility.

### Route Changes

| Before | After | Purpose |
|--------|-------|---------|
| `/projects` | `/projects` | All projects list (unchanged) |
| `/projects/[id]` | `/projects/[id]` | Individual project detail (unchanged) |
| `/projects/service/[slug]` | `/services/[slug]/projects` | Projects filtered by service |

### New Page: services/[slug]/projects.vue

**Location:** `app/pages/services/[slug]/projects.vue`

**Responsibilities:**
1. Load service by slug from route params
2. Load projects for that service
3. Handle 404 if service not found
4. Render breadcrumb back to `/projects`
5. Render service header (name, description, project count)
6. Render grid of ProjectCard components
7. Set page meta (title, description)

**Implementation:**
```vue
<script setup lang="ts">
import { useServices } from '~/hooks/useServices';
import { useProjects } from '~/hooks/useProjects';

const route = useRoute();
const { servicesFlat } = useServices();
const { getByService } = useProjects();

const service = computed(() => servicesFlat.value[route.params.slug as string]);
const projects = computed(() => getByService(route.params.slug as string));

if (!service.value) {
  throw createError({ statusCode: 404, message: 'Service not found' });
}

useHead({
  title: `${service.value.name} Projects - Graco Construction`,
  meta: [{ name: 'description', content: `View our portfolio of ${service.value.name} projects in Miami, Florida.` }]
});
</script>

<template>
  <main class="min-h-screen bg-background-primary">
    <section class="container mx-auto px-4 py-16">
      <div class="mb-12">
        <NuxtLink to="/projects" class="text-primary hover:underline">
          ← Back to All Projects
        </NuxtLink>
        <h1 class="text-4xl font-bold text-white mt-4">
          {{ service.name }}
        </h1>
        <p v-if="service.description" class="text-gray-2 mt-2">
          {{ service.description }}
        </p>
        <p class="text-gray-3 mt-2">
          {{ projects.length }} {{ projects.length === 1 ? 'project' : 'projects' }}
        </p>
      </div>

      <div v-if="projects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>

      <div v-else class="text-center py-16">
        <p class="text-gray-2">No projects found for this service.</p>
      </div>
    </section>
  </main>
</template>
```

---

### Link Updates

**Files to update:**
1. `app/components/Footer.vue` — service links in footer
2. `app/components/sections/services/Services.vue` — service card links
3. `app/components/Header.vue` — any service navigation links (if present)
4. Any other component with service-specific links

**Find/Replace pattern:**
```vue
<!-- Before -->
<NuxtLink :to="`/projects/service/${service.slug}`">

<!-- After -->
<NuxtLink :to="`/services/${service.slug}/projects`">
```

---

### File Deletion

**Remove:**
- `app/pages/projects/service/[slug].vue`
- `app/pages/projects/service/` directory (if empty)

**Reason:** Replaced by new `/services/[slug]/projects.vue` route.

---

### Benefits

1. **Semantic clarity**: Service-first URL pattern (`/services/X/...`)
2. **Future extensibility**: Can add `/services/[slug]/team`, `/services/[slug]/testimonials`, etc.
3. **Consistency**: Aligns with domain model (services contain projects)
4. **SEO**: Cleaner, more descriptive URLs

## Dependencies

- Updated composables (useServices, useProjects)
- Updated components (ProjectCard)

## Constraints

- All internal links must be updated in the same deployment
- If site is live, consider 301 redirects from old URLs to new (server-side config)
- Nuxt's file-based routing handles the new route structure automatically
- No changes to existing `/projects` or `/projects/[id]` routes
