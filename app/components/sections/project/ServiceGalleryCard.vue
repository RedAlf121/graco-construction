<template>
  <NuxtLink
    :to="`/services/${gallery.slug}/projects`"
    ref="cardRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="tiltStyle"
    class="group relative block overflow-hidden rounded-none bg-background-tertiary shadow-card-3d transition-shadow duration-300 hover:shadow-card-3d-hover"
    :class="`animate-fadeInUp [animation-delay:${delay}ms]`"
  >
    <div class="aspect-square overflow-hidden">
      <img
        :src="gallery.cover"
        :alt="gallery.service"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/50 to-transparent">
      <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div class="flex items-center gap-2">
          <i :class="['fas', gallery.icon, 'text-primary text-sm md:text-base']"></i>
          <h3 class="font-manrope text-base font-bold text-white md:text-lg">{{ gallery.service }}</h3>
        </div>
        <p class="mt-1 text-xs text-white/60 md:text-sm">{{ gallery.count }} Photos</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Gallery } from '~/hooks/useGalleries'
import { useTilt } from '~/hooks/useTilt'

defineProps<{
  gallery: Gallery
  delay?: number
}>()

const { cardRef, tiltStyle, onMouseMove, onMouseLeave } = useTilt(10)
</script>
