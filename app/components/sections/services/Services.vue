<template>
  <section ref="sectionRef" class="px-4 py-12 md:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl">
      <div :class="{ 'opacity-0': !isVisible, 'animate-fadeInUp': isVisible }">
        <SectionHeader
          title="Our Services"
          subtitle="Explore our expertise by category"
        />
      </div>

      <div class="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        <div
          v-for="(service, idx) in servicesTree"
          :key="service.id"
          class="flex flex-col rounded-none border border-white/10 bg-background-tertiary p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-card-3d-hover hover:border-primary border-t-2 border-primary/30 shadow-card-3d"
          :class="{
            'opacity-0': !isVisible,
            'animate-slideInLeft': isVisible && idx === 0,
            'animate-slideInRight': isVisible && idx === 1,
          }"
        >
          <template v-if="service.children && service.children.length">
            <div class="mb-6 flex items-center gap-4">
              <div class="flex size-20 items-center justify-center rounded-none bg-primary/10 text-3xl text-primary">
                <i :class="'fas ' + service.icon"></i>
              </div>
              <h3 class="text-4xl font-bold text-white">{{ service.name }}</h3>
            </div>
            <p v-if="service.description" class="mb-6 text-xl leading-relaxed text-white/70">
              {{ service.description }}
            </p>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div v-for="child in service.children" :key="child.id">
                <div class="mb-3 flex items-center gap-2">
                  <i :class="'fas ' + child.icon + ' text-xl text-primary'"></i>
                  <h4 class="text-xl font-bold text-white">{{ child.name }}</h4>
                </div>
                <ul v-if="child.children" class="space-y-2">
                  <li v-for="leaf in child.children" :key="leaf.id">
                    <NuxtLink
                      :to="`/services/${leaf.slug}/projects`"
                      class="group flex items-center gap-3 rounded-none px-3 py-2 transition-all duration-200 hover:bg-primary/10"
                    >
                      <i :class="'fas ' + leaf.icon + ' w-6 text-lg text-primary'"></i>
                      <span class="text-lg text-white/80 transition-colors group-hover:text-primary">{{ leaf.name }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center justify-center gap-4">
              <div class="flex size-20 items-center justify-center rounded-none bg-primary/10 text-3xl text-primary">
                <i :class="'fas ' + service.icon"></i>
              </div>
              <h3 class="text-4xl font-bold text-white">{{ service.name }}</h3>
            </div>
            <p v-if="service.description" class="flex-1 flex items-center justify-center text-center text-xl leading-relaxed text-white/70">
              {{ service.description }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '../SectionHeader.vue'
import { useInView } from '~/hooks/useInView'
import { useServices } from '~/hooks/useServices'

const { servicesTree } = useServices()
const { targetRef: sectionRef, isVisible } = useInView(0.3)
</script>
