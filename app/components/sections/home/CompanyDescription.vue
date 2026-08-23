<template>
  <section
    ref="containerRef"
    class="relative"
  >
    <div ref="inViewRef" class="clip-wrapper relative min-h-screen overflow-hidden">
      <div class="absolute inset-0 bg-background-secondary" />

      <div
        class="absolute left-0 right-0 h-[140%] -top-[20%]"
        :style="{ transform: `translateY(${translateY}px)` }"
      >
        <video
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          class="h-full w-full object-cover brightness-[0.3]"
        >
          <source src="/timelapse construccion webm.webm" type="video/webm" />
        </video>
      </div>

      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div class="relative z-10 flex min-h-screen items-center justify-center">
        <div class="w-full max-w-7xl px-4 py-12 text-center md:px-8 md:py-16 lg:py-20">
          <h2
            :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible }"
            class="font-manrope font-bold uppercase tracking-[0.15em] text-white/90 drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 md:mb-4"
          >
            Design. Build. Deliver.
          </h2>
          <p
            :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible, '[animation-delay:100ms]': isVisible }"
            class="mx-auto max-w-3xl font-light leading-relaxed text-white/80 drop-shadow-md text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
          >
            Over +25 years of construction excellence across Florida
          </p>

          <div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible, [`[animation-delay:${(index + 2) * 100}ms]`]: isVisible }"
            >
              <StatCard
                :icon="stat.icon"
                :number="stat.number"
                :label="stat.label"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import StatCard from './StatCard.vue'
import { useParallax } from '~/hooks/useParallax'
import { useInView } from '~/hooks/useInView'

interface Stat {
  icon: string
  number: string
  label: string
}

const stats: Stat[] = [
  { icon: 'fa-calendar-days', number: '25+', label: 'Years Experience' },
  { icon: 'fa-building', number: '200+', label: 'Projects Completed' },
  { icon: 'fa-users', number: '50+', label: 'Team Members' }
]

const { containerRef, translateY } = useParallax(0.3)
const { targetRef: inViewRef, isVisible } = useInView(0.3)
</script>

<style>
.clip-wrapper {
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.7);
}

@media (min-width: 768px) {
  .clip-wrapper {
    clip-path: polygon(0 8%, 100% 0%, 100% 92%, 0 100%);
  }
}

@media (max-width: 767px) {
  .clip-wrapper {
    clip-path: polygon(0 4%, 100% 1%, 100% 96%, 0 99%);
  }
}
</style>
