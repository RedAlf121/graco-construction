<template>
  <div @click="$emit('click', project)"
    ref="cardRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="tiltStyle"
    class="group relative cursor-pointer overflow-hidden rounded-none bg-[#2C2C2E] shadow-card-3d transition-shadow duration-300 hover:shadow-card-3d-hover">
    <div class="aspect-video overflow-hidden">
      <img :src="$props.project.coverImage" :alt="$props.project.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
    </div>

    <div class="p-4">
      <h4 class="font-manrope text-lg font-bold text-white">
        {{ $props.project.name }}
      </h4>
      <p class="mt-1 text-sm text-white/60">{{ $props.project.location }}</p>
      <div class="mt-3">
        <span class="inline-block rounded-none bg-[#FF9F0A]/20 px-3 py-1 text-xs font-semibold text-[#FF9F0A] border-l-2 border-primary/40">
          {{ $props.project.service?.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/hooks/useProjects'
import { useTilt } from '~/hooks/useTilt'

interface Properties{
  project: Project
}

defineProps<Properties>()

defineEmits<{
  (e: 'click', project: Project): void
}>()

const { cardRef, tiltStyle, onMouseMove, onMouseLeave } = useTilt(10)
</script>