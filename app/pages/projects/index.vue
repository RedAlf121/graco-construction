<template>
  <div class="py-8 md:py-10">
    <SectionHeader title="Our Services" />

    <section class="container mx-auto px-4">
      <h2 class="text-2xl md:text-4xl font-bold text-white mb-4">Construction Management</h2>

      <h3 class="text-2xl font-bold text-white/80 mb-3">Residential</h3>
      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <NuxtLink
          v-for="(card, index) in residentialCards"
          :key="card.slug"
          :to="card.to"
          class="group relative block overflow-hidden rounded-none bg-background-tertiary transition-all duration-300 hover:-translate-y-1 hover:shadow-card-3d-hover shadow-card-3d w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-10.667px)]"
          :class="`animate-fadeInUp [animation-delay:${(index + 1) * 100}ms]`"
        >
          <div class="aspect-video overflow-hidden">
            <img
              :src="card.cover"
              :alt="card.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/50 to-transparent">
            <div class="absolute bottom-0 left-0 right-0 p-3">
              <div class="flex items-center gap-2">
                <i :class="['fas', card.icon, 'text-primary text-base']"></i>
                <h3 class="font-manrope text-base font-bold text-white md:text-xl">{{ card.title }}</h3>
              </div>
              <p class="mt-0.5 text-sm text-white/60 md:text-lg">{{ card.count }} Projects</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <h3 class="text-2xl font-bold text-white/80 mb-3">Commercial</h3>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="(card, index) in commercialCards"
          :key="card.slug"
          :to="card.to"
          class="group relative block overflow-hidden rounded-none bg-background-tertiary transition-all duration-300 hover:-translate-y-1 hover:shadow-card-3d-hover shadow-card-3d"
          :class="`animate-fadeInUp [animation-delay:${(index + 1) * 100}ms]`"
        >
          <div class="aspect-video overflow-hidden">
            <img
              :src="card.cover"
              :alt="card.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/50 to-transparent">
            <div class="absolute bottom-0 left-0 right-0 p-3">
              <div class="flex items-center gap-2">
                <i :class="['fas', card.icon, 'text-primary text-base']"></i>
                <h3 class="font-manrope text-base font-bold text-white md:text-lg">{{ card.title }}</h3>
              </div>
              <p class="mt-0.5 text-sm text-white/60 md:text-base">{{ card.count }} Projects</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from '../../components/sections/SectionHeader.vue'
import { useServices } from '../../hooks/useServices'
import { useProjects } from '../../hooks/useProjects'

const { getLeafServices } = useServices()
const { getByService } = useProjects()

interface ServiceCard {
  slug: string
  title: string
  icon: string
  cover: string
  count: number
  to: string
  description: string
}

function toServiceCard(slug: string): ServiceCard {
  const projects = getByService(slug)
  const first = projects[0]
  return {
    slug,
    title: first?.service?.name ?? slug,
    icon: first?.service?.icon ?? 'fa-briefcase',
    cover: first?.coverImage ?? '',
    count: projects.length,
    to: `/services/${slug}/projects`,
    description: first?.service?.description ?? placeholderDescription(slug),
  }
}

function placeholderDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'new-construction': 'Custom residential construction from foundation to finish.',
    'renovation-projects': 'Transforming existing spaces into modern environments.',
    'general-commercial': 'Comprehensive commercial construction across South Florida.',
    'medical-facilities': 'Specialized healthcare construction and medical facilities.',
    'concrete-restoration': 'Specialized concrete restoration and waterproofing solutions.',
  }
  return descriptions[slug] ?? ''
}

const residentialCards: ServiceCard[] = [
  toServiceCard('new-construction'),
  toServiceCard('renovation-projects'),
]

const commercialCards: ServiceCard[] = [
  toServiceCard('general-commercial'),
  toServiceCard('medical-facilities'),
  toServiceCard('concrete-restoration'),
]
</script>