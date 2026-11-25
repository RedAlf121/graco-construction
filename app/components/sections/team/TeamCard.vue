<template>
  <div
    ref="cardRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="[tiltStyle, { animationDelay: delay + 'ms' }]"
    class="fade-in-up relative overflow-hidden rounded-none bg-[#2C2C2E] shadow-card-3d transition-shadow duration-300 ease-in-out hover:shadow-card-3d-hover"
    :class="[
      'border-[6px] sm:border-[8px] lg:border-[12px]',
      'border-white/5 hover:border-[#FF9F0A]/20',
    ]"
  >
    <img
      :src="image"
      :alt="alt"
      class="w-full object-cover transition-transform duration-500 hover:scale-105"
      :class="[
        'h-[250px] sm:h-[280px] md:h-[300px] lg:h-[320px]',
      ]"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
import { useTilt } from '~/hooks/useTilt'

interface Props {
  image: string
  alt: string
  delay?: number
}

defineProps<Props>()

const { cardRef, tiltStyle, onMouseMove, onMouseLeave } = useTilt(8)
</script>