<template>
  <section class="px-4 py-12 md:py-16 lg:py-20">
    <div class="mx-auto max-w-6xl">
      <div v-if="project">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-primary mb-8"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Back to All Projects</span>
        </NuxtLink>

        <ProjectHeroCarousel
          v-if="carouselImages.length > 0"
          :images="carouselImages"
          :project="project"
          class="mb-8"
        />

        <p class="text-white/80 text-lg leading-relaxed mb-10 max-w-3xl">
          {{ project.description }}
        </p>

        <div v-if="project.gallery?.images.length" class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          <button
            v-for="(image, index) in project.gallery.images"
            :key="index"
            @click="openGallery(index)"
            class="group relative aspect-square overflow-hidden rounded-none bg-background-tertiary transition-all duration-300 hover:-translate-y-1 hover:shadow-card-3d-hover shadow-card-3d"
          >
            <img
              :src="image"
              :alt="`${project.name} photo ${index + 1}`"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </button>
        </div>

        <ModalGallery
          :is-open="modalOpen"
          :project="modalProject"
          :start-index="currentIndex"
          @close="modalOpen = false"
        />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20">
        <i class="fas fa-exclamation-circle text-6xl text-white/20"></i>
        <h2 class="mt-4 text-2xl font-bold text-white">Project Not Found</h2>
        <p class="mt-2 text-white/60">The project you're looking for doesn't exist.</p>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ModalGallery from '~/components/sections/project/ModalGallery.vue'
import ProjectHeroCarousel from '~/components/sections/project/ProjectHeroCarousel.vue'
import { useProjects } from '~/hooks/useProjects'

const route = useRoute()
const { getById } = useProjects()

const project = computed(() => getById(route.params.id as string) ?? null)

const modalOpen = ref(false)
const currentIndex = ref(0)

const modalProject = computed(() => project.value)

// Merge cover image with gallery images for carousel
const carouselImages = computed(() => {
  const currentProject = project.value

  if (!currentProject) return []

  const allImages = [currentProject.coverImage]

  if (currentProject.gallery?.images) {
    currentProject.gallery.images.forEach((img) => {
      // Avoid duplicates if cover image is already in gallery
      if (img !== currentProject.coverImage) {
        allImages.push(img)
      }
    })
  }

  return allImages
})

function openGallery(index: number) {
  currentIndex.value = index
  modalOpen.value = true
}

useHead({
  title: project.value ? `${project.value.name} — Graco Construction Group` : 'Project — Graco Construction Group',
  meta: project.value ? [
    { name: 'description', content: project.value.description },
    { name: 'og:title', content: `${project.value.name} — Graco Construction Group` },
    { name: 'og:description', content: project.value.description },
    { name: 'og:image', content: project.value.coverImage },
  ] : []
})
</script>