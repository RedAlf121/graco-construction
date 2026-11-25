<template>
  <div
    ref="cardRef"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="tiltStyle"
    class="relative aspect-video w-full overflow-hidden rounded-none bg-[#2C2C2E] shadow-card-3d transition-shadow duration-350 ease-cubic hover:shadow-card-3d-hover cursor-default"
    :class="[
      'max-h-[300px] sm:max-h-[330px] md:max-h-[360px] lg:max-h-[400px]',
      floorClass,
      'select-none',
    ]"
  >
    <div class="absolute inset-0 z-[1] flex">
      <div
        class="w-1.5"
        :class="accentClass"
      ></div>
    </div>

    <div
      class="absolute top-3 left-4 z-[3] flex items-center gap-2"
    >
      <span
        class="font-mono text-[10px] font-bold tracking-[0.2em] uppercase"
        :class="accentTextClass"
      >
        FLOOR {{ floorNumber }}
      </span>
    </div>

    <video
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      class="h-full w-full object-cover brightness-[0.6] transition-all duration-500 ease-cubic"
    >
      <source :src="videoUrl" type="video/webm" />
    </video>

    <div
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/60 via-black/40 to-black/60 p-3 sm:p-4 z-[2]"
    >
      <div class="text-center">
        <h3
          class="mb-1 font-manrope font-extrabold uppercase leading-tight text-white drop-shadow-lg"
          :class="['text-2xl sm:text-3xl md:text-4xl xl:text-5xl']"
        >
          {{ title }}
        </h3>
        <p
          class="font-manrope font-light text-white/90 drop-shadow-md"
          :class="['text-base sm:text-lg md:text-xl lg:text-2xl']"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div
      class="absolute bottom-3 left-4 right-4 z-[3] flex items-center gap-2 opacity-60"
    >
      <div v-for="i in 3" :key="i" class="h-px flex-1" :class="i <= floorNumber ? accentClass : 'bg-white/10'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTilt } from '~/hooks/useTilt'

interface Props {
  videoUrl: string
  title: string
  subtitle: string
  floorNumber?: number
}

const props = defineProps<Props>()

const { cardRef, tiltStyle, onMouseMove, onMouseLeave } = useTilt(8)

const accentClasses = ['bg-blue-500', 'bg-primary', 'bg-accent']
const accentTextClasses = ['text-blue-400', 'text-primary', 'text-accent']

const floorIndex = computed(() => Math.max(0, Math.min(2, (props.floorNumber || 1) - 1)))

const accentClass = computed(() => accentClasses[floorIndex.value])
const accentTextClass = computed(() => accentTextClasses[floorIndex.value])

const floorClass = computed(() => `floor-${props.floorNumber || 1}`)
</script>
