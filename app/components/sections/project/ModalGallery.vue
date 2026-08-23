<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click.self="close">
      <div class="relative w-full max-w-4xl bg-[#2C2C2E] rounded-none shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-white/10">
          <h3 class="text-lg font-semibold text-white">{{ project?.name }}</h3>
          <button @click="close" class="text-white/70 hover:text-white transition-colors">
            <span class="sr-only">Cerrar</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Carrusel -->
        <div class="relative aspect-video bg-black/40">
          <!-- Imagen actual (simulada con div de color) -->
          <div class="w-full h-full flex items-center justify-center">
            <img
              :src="currentImage" 
              class="w-full h-full object-cover transition-all duration-300"
            ></img>
          </div>

          <!-- Botones de navegación -->
          <button 
            v-if="totalImages > 1"
            @click="prev"
            class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition"
          >
            <span class="sr-only">Anterior</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            v-if="totalImages > 1"
            @click="next"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition"
          >
            <span class="sr-only">Siguiente</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Indicadores de imagen -->
        <div v-if="totalImages > 1" class="flex justify-center gap-2 p-4">
          <button
            v-for="index in totalImages"
            :key="index"
            @click="currentIndex = index - 1"
            class="w-2 h-2 rounded-none transition-all"
            :class="currentIndex === index - 1 ? 'bg-[#FF9F0A] w-4' : 'bg-white/30 hover:bg-white/50'"
          >
            <span class="sr-only">Ir a imagen {{ index }}</span>
          </button>
        </div>

        <!-- Información del proyecto -->
        <div class="p-4 border-t border-white/10 text-white/80">
          <p class="text-sm">{{ project?.description }}</p>
          <p class="text-xs mt-2 text-white/50">{{ project?.location }} • {{ project?.service?.name }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Project } from '~/hooks/useProjects'

const props = withDefaults(defineProps<{
  isOpen: boolean
  project: Project | null
  startIndex?: number
}>(), {
  startIndex: 0
})


const emit = defineEmits<{
  (e: 'close'): void
}>()

const gallery = computed(() => props.project?.gallery?.images ?? [])

const totalImages = computed(() => Math.max(gallery.value.length, 1))

const currentIndex = ref(0)

watch(() => props.project, (newProject) => {
  currentIndex.value =  props.startIndex ?? 0
}, { immediate: true })

const currentImage = computed(() => gallery.value[currentIndex.value % gallery.value.length])
console.log(currentImage.value)
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + totalImages.value) % totalImages.value
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % totalImages.value
}

const close = () => {
  emit('close')
}

// Manejador de teclas
watch(() => props.isOpen, (open) => {
  if (!open) return
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }
  window.addEventListener('keydown', handleKey)
  return () => window.removeEventListener('keydown', handleKey)
}, { immediate: true })
</script>