<template>
  <section ref="sectionRef" class="relative px-4 py-12 md:py-16 lg:py-20 overflow-hidden">
    <div :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible }">
      <SectionHeader
        title="Our Process"
        subtitle="Each stage is executed with precision and meticulous attention"
      />
    </div>

    <div class="relative mx-auto mt-8 lg:mt-12 max-w-5xl">
      <div class="flex flex-col items-center gap-px">
        <div
          v-for="(card, index) in buildingCards"
          :key="card.title"
          :class="{ 'opacity-0': !isVisible, 'animate-scaleIn': isVisible, [`[animation-delay:${(index + 1) * 200}ms]`]: isVisible }"
          class="w-full"
          :style="buildingWidths[index]"
        >
          <div class="flex items-stretch">
            <div class="hidden lg:flex flex-col items-center justify-center w-10 flex-shrink-0">
              <div class="text-xs font-mono text-primary/60 font-bold tracking-wider -rotate-90 whitespace-nowrap">
                {{ floorLabels[buildingCards.length - 1 - index] }}
              </div>
            </div>
            <div class="flex-1 min-w-0 relative">
              <div
                v-if="index > 0"
                class="hidden lg:block absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              ></div>
              <ProcessCard
                :title="card.title"
                :subtitle="card.subtitle"
                :video-url="card.videoUrl"
                :floor-number="buildingCards.length - index"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '../SectionHeader.vue'
import ProcessCard from './ProcessCard.vue'
import { useInView } from '~/hooks/useInView'

interface CardProperties {
  videoUrl: string
  title: string
  subtitle: string
}

const cards: CardProperties[] = [
  {
    videoUrl: '/toma aerea de trabajadores con planos webm.webm',
    title: 'PLANNING',
    subtitle: 'Advanced design and strategy',
  },
  {
    videoUrl: '/trabajadores señalando obra webm.webm',
    title: 'SUPERVISION',
    subtitle: 'Constant quality control',
  },
  {
    videoUrl: '/trabajando con cierra webm.webm',
    title: 'CONSTRUCTION',
    subtitle: 'Precision in every detail',
  },
]

const buildingCards = [...cards].reverse()

const buildingWidths = [
  { maxWidth: '480px' },
  { maxWidth: '560px' },
  { maxWidth: '640px' },
]

const floorLabels = ['FOUNDATION', 'STRUCTURE', 'COMPLETION']

const { targetRef: sectionRef, isVisible } = useInView(0.3)
</script>

<style scoped>
</style>
