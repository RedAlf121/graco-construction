<template>
  <div
    ref="cardRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="tiltStyle"
    class="group relative overflow-hidden rounded-none bg-background-tertiary shadow-card-3d transition-shadow duration-300 hover:shadow-card-3d-hover"
  >
    <img
      :src="project.image"
      :alt="project.title"
      class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div class="absolute bottom-0 left-0 right-0 p-6">
        <p class="text-sm text-primary font-medium">{{ project.service }}</p>
        <h3 class="mt-1 text-lg font-bold text-white">{{ project.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTilt } from '~/hooks/useTilt'

interface Props {
  project: {
    id: number
    title: string
    image: string
    service: string
  }
  delay?: number
}

defineProps<Props>()

const { cardRef, tiltStyle, onMouseMove, onMouseLeave } = useTilt(10)
</script>