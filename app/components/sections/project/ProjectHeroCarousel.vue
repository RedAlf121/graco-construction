<template>
  <div class="relative aspect-video overflow-hidden rounded-none">
    <!-- Carousel Images -->
    <div class="relative h-full w-full">
      <div 
        class="flex transition-transform duration-500 ease-out h-full"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(image, index) in images"
          :key="image"
          class="min-w-full h-full flex-shrink-0"
        >
          <img
            :src="image"
            :alt="`${project.name} - Image ${index + 1}`"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-background-primary/80 via-transparent to-transparent pointer-events-none" />

    <!-- Project Info Overlay -->
    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
      <h1 class="font-manrope text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-2">
        {{ project.name }}
      </h1>
      <div class="flex items-center gap-3 text-sm text-white/70">
        <span>{{ project.location }}</span>
        <span class="text-white/30">•</span>
        <span class="inline-block rounded-none bg-primary/20 px-3 py-1 text-xs font-semibold text-primary border-l-2 border-primary/40">
          {{ project.service?.name }}
        </span>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-background-primary/60 hover:bg-background-primary/80 text-white w-12 h-12 flex items-center justify-center rounded-none transition-colors duration-300 backdrop-blur-sm z-10"
      aria-label="Previous image"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-background-primary/60 hover:bg-background-primary/80 text-white w-12 h-12 flex items-center justify-center rounded-none transition-colors duration-300 backdrop-blur-sm z-10"
      aria-label="Next image"
    >
      <i class="fas fa-chevron-right"></i>
    </button>

    <!-- Dot Indicators -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
      <button
        v-for="(_, index) in images"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-2 h-2 transition-all duration-300',
          index === currentIndex
            ? 'bg-primary w-8'
            : 'bg-white/40 hover:bg-white/60'
        ]"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Project {
  name: string
  location: string
  service?: {
    name: string
  }
}

interface Props {
  images: string[]
  project: Project
  interval?: number
}

const props = withDefaults(defineProps<Props>(), {
  interval: 5000
})

const currentIndex = ref(0)
let autoPlayTimer: ReturnType<typeof setInterval> | null = null
let isPaused = ref(false)

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  resetAutoPlay()
}

function prevSlide() {
  currentIndex.value = currentIndex.value === 0 
    ? props.images.length - 1 
    : currentIndex.value - 1
  resetAutoPlay()
}

function goToSlide(index: number) {
  currentIndex.value = index
  resetAutoPlay()
}

function startAutoPlay() {
  if (props.images.length <= 1) return
  autoPlayTimer = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, props.interval)
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

function resetAutoPlay() {
  stopAutoPlay()
  startAutoPlay()
}

function handleMouseEnter() {
  isPaused.value = true
}

function handleMouseLeave() {
  isPaused.value = false
}

onMounted(() => {
  startAutoPlay()
  
  // Add keyboard navigation
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide()
    if (e.key === 'ArrowRight') nextSlide()
  }
  
  window.addEventListener('keydown', handleKeydown)
  
  // Pause on hover
  const carousel = document.querySelector('.group')
  if (carousel) {
    carousel.addEventListener('mouseenter', handleMouseEnter)
    carousel.addEventListener('mouseleave', handleMouseLeave)
  }
  
  onUnmounted(() => {
    stopAutoPlay()
    window.removeEventListener('keydown', handleKeydown)
    if (carousel) {
      carousel.removeEventListener('mouseenter', handleMouseEnter)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
    }
  })
})
</script>

<style scoped>
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.6s ease;
}

.carousel-fade-enter-from {
  opacity: 0;
}

.carousel-fade-leave-to {
  opacity: 0;
}

.carousel-fade-enter-to,
.carousel-fade-leave-from {
  opacity: 1;
}
</style>
