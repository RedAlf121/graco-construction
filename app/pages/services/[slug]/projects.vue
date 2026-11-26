<template>
  <main class="min-h-screen bg-gradient-to-l from-background-secondary to-background-primary">
  <section class="px-4 py-12 md:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl">
      <div v-if="service">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-primary"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Back to All Projects</span>
        </NuxtLink>

        <div class="mt-6 mb-10">
          <div class="flex items-center gap-3">
            <i :class="['fas', service.icon, 'text-2xl text-primary md:text-3xl']"></i>
            <h1 class="font-manrope text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {{ service.name }}
            </h1>
          </div>
          <p v-if="service.description" class="mt-2 text-sm text-white/50">
            {{ service.description }}
          </p>
          <p class="mt-2 text-sm text-white/50">
            {{ projects.length }} {{ projects.length === 1 ? 'project' : 'projects' }}
          </p>
        </div>

        <div
          v-if="projects.length > 0"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            v-for="project in projects"
            :key="project.id"
            :to="`/projects/${project.id}`"
          >
            <ProjectCard :project="project" />
          </NuxtLink>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20">
          <i class="fas fa-folder-open text-6xl text-white/20"></i>
          <h2 class="mt-4 text-2xl font-bold text-white">No Projects Found</h2>
          <p class="mt-2 text-white/60">There are no projects in this category yet.</p>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20">
        <i class="fas fa-image text-6xl text-white/20"></i>
        <h2 class="mt-4 text-2xl font-bold text-white">Service Not Found</h2>
        <p class="mt-2 text-white/60">The service you're looking for doesn't exist.</p>
        <NuxtLink
          to="/projects"
          class="mt-6 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary-light"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Back to All Projects</span>
        </NuxtLink>
      </div>
    </div>
  </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProjectCard from '~/components/sections/project/ProjectCard.vue'
import { useServices } from '~/hooks/useServices'
import { useProjects } from '~/hooks/useProjects'

const route = useRoute()
const slug = route.params.slug as string
const { servicesFlat } = useServices()
const { getByService } = useProjects()

const service = computed(() => servicesFlat[slug] ?? null)
const projects = computed(() => getByService(slug))

useHead({
  title: service.value ? `${service.value.name} Projects — Graco Construction Group` : 'Service — Graco Construction Group',
  meta: service.value ? [
    { name: 'description', content: `Browse our ${service.value.name} projects at Graco Construction Group.` }
  ] : []
})
</script>