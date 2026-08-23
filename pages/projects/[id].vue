<template>
  <section class="px-4 py-12 md:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl">
      <div v-if="project">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-primary mb-8"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Back to All Projects</span>
        </NuxtLink>

        <!-- Hero con info del proyecto -->
        <div class="mb-8 text-center">
          <h1 class="font-manrope text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-4">
            {{ project.name }}
          </h1>
          <div class="flex items-center justify-center gap-3 text-sm text-white/70 mb-6">
            <span>{{ project.location }}</span>
            <span class="text-white/30">•</span>
            <span class="inline-block rounded-none bg-primary/20 px-3 py-1 text-xs font-semibold text-primary border-l-2 border-primary/40">
              {{ project.service?.name }}
            </span>
          </div>
        </div>

        <!-- Carrusel de imágenes de la galería -->
        <div v-if="galleryImages.length" class="relative max-w-3xl mx-auto mb-8">
          <div class="relative h-[450px] overflow-hidden rounded-none shadow-3d bg-black/20 flex items-center justify-center">
            <img
              :src="galleryImages[currentImageIndex]"
              :alt="`${project.name} - Image ${currentImageIndex + 1}`"
              class="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-500"
            />
          </div>

          <!-- Botones de navegación -->
          <button 
            v-if="galleryImages.length > 1"
            @click="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-none bg-black/70 text-white hover:bg-black/90 flex items-center justify-center transition-all hover:scale-110 shadow-button-primary z-10"
          >
            <span class="sr-only">Anterior</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            v-if="galleryImages.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-none bg-black/70 text-white hover:bg-black/90 flex items-center justify-center transition-all hover:scale-110 shadow-button-primary z-10"
          >
            <span class="sr-only">Siguiente</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Indicadores -->
          <div v-if="galleryImages.length > 1" class="flex justify-center gap-2 mt-4">
            <button
              v-for="(img, index) in galleryImages"
              :key="index"
              @click="currentImageIndex = index"
              class="w-2 h-2 rounded-none transition-all"
              :class="currentImageIndex === index ? 'bg-[#FF9F0A] w-4' : 'bg-white/30 hover:bg-white/50'"
            >
              <span class="sr-only">Ir a imagen {{ index + 1 }}</span>
            </button>
          </div>

          <!-- Contador de imágenes -->
          <div class="text-center mt-2 text-white/50 text-sm">
            {{ currentImageIndex + 1 }} / {{ galleryImages.length }}
          </div>
        </div>

        <p class="text-white/80 text-lg leading-relaxed mb-10 max-w-3xl mx-auto text-center">
          {{ project.description }}
        </p>
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
import { useProjects } from '~/hooks/useProjects'

const route = useRoute()
const { getById } = useProjects()

const project = computed(() => getById(route.params.id as string) ?? null)

// Carrusel de imágenes de la galería
const currentImageIndex = ref(0)
const galleryImages = computed(() => project.value?.gallery?.images ?? [])

const prevImage = () => {
  if (galleryImages.value.length === 0) return
  currentImageIndex.value = (currentImageIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length
}

const nextImage = () => {
  if (galleryImages.value.length === 0) return
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryImages.value.length
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
