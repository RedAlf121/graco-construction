<template>
  <Header
    ref="headerRef"
    :class="[
      'z-[1000] w-full font-montserrat bg-background-secondary py-2 flex items-center',
      isHome ? 'fixed top-0' : 'sticky top-0',
    ]">
  </Header>
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const headerRef = ref<{ $el: HTMLElement } | null>(null)
let observer: ResizeObserver | null = null
let observed: HTMLElement | null = null

// Keep --header-height in sync with the real fixed header height so hero
// content and scroll-padding always clear it (the mobile header is taller
// than the old static values). Self-healing: the header root is
// swapped by v-if at the 1100px breakpoint, so always re-read the live element.
const syncHeaderHeight = () => {
  const el = headerRef.value?.$el
  if (!el || !el.isConnected) return
  document.documentElement.style.setProperty('--header-height', `${el.offsetHeight}px`)
  if (el !== observed) {
    observed = el
    observer?.disconnect()
    observer = new ResizeObserver(syncHeaderHeight)
    observer.observe(el)
  }
}

onMounted(() => {
  syncHeaderHeight()
  // Header switches mobile/desktop in its own onMounted; re-sync after that render
  nextTick(syncHeaderHeight)
  window.addEventListener('resize', syncHeaderHeight)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('resize', syncHeaderHeight)
})
</script>