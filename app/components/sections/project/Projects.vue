<template>
  <section id="projects" class="px-4 py-16 md:py-20 lg:py-24">
    <div class="container mx-auto">
      <SectionHeader title="Our Projects" subtitle="Transforming visions into architectural realities" />

      <DesktopView
        v-if="isDesktop"
        :services="servicesWithProjects"
      />
      <MobileView
        v-else
        :services="servicesWithProjects"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SectionHeader from '../SectionHeader.vue'
import DesktopView from './DesktopView.vue'
import MobileView from './MobileView.vue'
import { useServices } from '~/hooks/useServices'
import { useProjects } from '~/hooks/useProjects'

const { getLeafServices } = useServices()
const { getByService } = useProjects()

const servicesWithProjects = getLeafServices()
  .filter((service) => getByService(service.id).length > 0)
  .map((service) => ({
    service,
    projects: getByService(service.id),
    count: getByService(service.id).length,
  }))

const isDesktop = ref(false)
let mql: MediaQueryList

const updateBreakpoint = (e: MediaQueryListEvent | MediaQueryList) => {
  isDesktop.value = e.matches
}

onMounted(() => {
  mql = window.matchMedia('(min-width: 1024px)')
  updateBreakpoint(mql)
  mql.addEventListener('change', updateBreakpoint)
})

onUnmounted(() => {
  mql.removeEventListener('change', updateBreakpoint)
})
</script>