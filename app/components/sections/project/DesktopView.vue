<template>
  <div v-if="services?.length" class="relative mt-10 lg:mt-12">
    <div class="flex-1">
      <div v-for="entry in services" :key="entry.service.id" class="scroll-mt-24">
        <h2 class="mb-6 font-['Manrope',sans-serif] text-2xl font-bold text-white lg:text-3xl">
          {{ entry.service.name }}
        </h2>

        <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          <ProjectCard
            v-for="project in entry.projects"
            :key="project.id"
            :project="project"
            @click="openModal(project)"
          />
        </div>

        <p v-if="!entry.projects.length" class="text-sm text-white/50">
          Proyectos próximamente.
        </p>
      </div>
    </div>

    <ModalGallery
      :is-open="modalOpen"
      :project="selectedProject!"
      @close="modalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectCard from './ProjectCard.vue'
import ModalGallery from './ModalGallery.vue'
import type { ServiceNode } from '~/hooks/useServices'
import type { Project } from '~/hooks/useProjects'

export interface ServiceWithProjects {
  service: ServiceNode
  projects: Project[]
  count: number
}

defineProps<{
  services: ServiceWithProjects[]
}>()

const selectedProject = ref<Project | null>(null)
const modalOpen = ref(false)

function openModal(project: Project) {
  selectedProject.value = project
  modalOpen.value = true
}
</script>