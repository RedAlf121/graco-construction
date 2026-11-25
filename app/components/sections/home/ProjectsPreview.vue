<template>
  <section ref="sectionRef" class="px-4 py-12 md:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl">
      <div :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible }">
        <SectionHeader
          title="Featured Projects"
          subtitle="A glimpse of our recent work across residential and commercial"
        />
      </div>

          <div class="relative mx-auto mt-12 max-w-6xl">
            <div ref="viewportRef" class="overflow-hidden">
              <div class="flex touch-pan-y">
                <div
                  v-for="project in featuredProjects"
                  :key="project.id"
                  class="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-3"
                >
                  <NuxtLink :to="`/projects/${project.id}`" class="block">
                    <ProjectPreviewCard :project="project" />
                  </NuxtLink>
                </div>
              </div>
            </div>

        <button
          v-if="snapCount > 1"
          @click="scrollPrev"
          class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-none bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition"
        >
          <span class="sr-only">Previous</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          v-if="snapCount > 1"
          @click="scrollNext"
          class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-none bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition"
        >
          <span class="sr-only">Next</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div v-if="snapCount > 1" class="flex justify-center gap-2 mt-6">
        <button
          v-for="index in snapCount"
          :key="index"
          @click="scrollTo(index - 1)"
          class="w-2 h-2 rounded-none transition-all"
          :class="selectedSnap === index - 1 ? 'bg-[#FF9F0A] w-4' : 'bg-white/30 hover:bg-white/50'"
        >
          <span class="sr-only">Go to page {{ index }}</span>
        </button>
      </div>

      <div :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible, '[animation-delay:400ms]': isVisible }">
        <div class="mx-auto mt-10 max-w-6xl text-center">
          <NuxtLink
            to="/projects"
            class="inline-flex items-center justify-center gap-3 border-2 border-primary bg-gradient-to-br from-primary to-primary-dark px-8 py-4 text-black font-extrabold uppercase tracking-wide transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_8px_0_0_#D87A00,0_16px_30px_rgba(255,159,10,0.4)] active:translate-y-0 active:shadow-[0_4px_0_0_#D87A00,0_8px_15px_rgba(255,159,10,0.2)]"
          >
            View All Projects
            <i class="fas fa-arrow-right text-lg transition-transform group-hover:translate-x-[5px]"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import SectionHeader from '../SectionHeader.vue'
import ProjectPreviewCard from './ProjectPreviewCard.vue'
import { useInView } from '~/hooks/useInView'
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import { useProjects } from '~/hooks/useProjects'
import { useServices } from '~/hooks/useServices'

interface FeaturedProject {
  id: number
  title: string
  image: string
  service: string
}

// Dynamically select up to 5 projects (one per leaf service) using composables
const { projects, getByService } = useProjects()
const { getLeafServices } = useServices()

const featuredProjects = computed<FeaturedProject[]>(() => {
  const leafs = getLeafServices()
  const selected: FeaturedProject[] = []
  const pickedIds = new Set<number>()

  for (const svc of leafs) {
    const svcProjects = getByService(svc.id)
    const candidates = svcProjects
      .filter((p) => p.status === 'completed')
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))

    const pick = candidates[0] ?? svcProjects[0]
    if (pick && !pickedIds.has(pick.id)) {
      selected.push({ id: pick.id, title: pick.name, image: pick.coverImage, service: svc.name })
      pickedIds.add(pick.id)
    }
    if (selected.length >= 5) break
  }

  // Fill with recent projects if we have less than 5
  if (selected.length < 5) {
    const extras = projects
      .filter((p) => !pickedIds.has(p.id))
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    for (const p of extras) {
      selected.push({ id: p.id, title: p.name, image: p.coverImage, service: p.service?.name ?? '' })
      if (selected.length >= 5) break
    }
  }

  return selected
})

const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })

const getSlidesToScroll = (): number => {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 768) return 2
  return 1
}

const [emblaNode, emblaApi] = emblaCarouselVue(
  {
    align: 'start',
    slidesToScroll: getSlidesToScroll(),
    loop: true,
  },
  [autoplay]
)

const viewportRef = emblaNode

const selectedSnap = ref(0)
const snapCount = ref(0)

let resumeTimer: ReturnType<typeof setTimeout> | null = null
let resizeTimeout: ReturnType<typeof setTimeout> | null = null
let resizeHandler: (() => void) | null = null

const scheduleResume = () => {
  if (resumeTimer) clearTimeout(resumeTimer)
  resumeTimer = setTimeout(() => {
    autoplay.play()
  }, 5000)
}

const pauseAutoplay = () => {
  autoplay.stop()
  if (resumeTimer) clearTimeout(resumeTimer)
}

const scrollPrev = () => {
  pauseAutoplay()
  emblaApi.value?.scrollPrev()
  scheduleResume()
}
const scrollNext = () => {
  pauseAutoplay()
  emblaApi.value?.scrollNext()
  scheduleResume()
}
const scrollTo = (index: number) => {
  pauseAutoplay()
  emblaApi.value?.scrollTo(index)
  scheduleResume()
}

onMounted(() => {
  if (!emblaApi.value) return
  const onSelect = () => {
    selectedSnap.value = emblaApi.value!.selectedScrollSnap()
    snapCount.value = emblaApi.value!.scrollSnapList().length
  }
  emblaApi.value.on('select', onSelect)
  onSelect()

  resizeHandler = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      const newSlidesToScroll = getSlidesToScroll()
      autoplay.stop()
      emblaApi.value?.reInit({ slidesToScroll: newSlidesToScroll })
      autoplay.play()
    }, 150)
  }
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  if (resumeTimer) clearTimeout(resumeTimer)
  if (resizeTimeout) clearTimeout(resizeTimeout)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})

const { targetRef: sectionRef, isVisible } = useInView(0.3)
</script>