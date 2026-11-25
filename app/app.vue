<template>
  <Header
    ref="headerRef"
    class="fixed top-0 z-[1000] w-full font-montserrat bg-background-secondary py-2 flex justify-between lg:justify-around items-center">
  </Header>
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const headerRef = ref<{ $el: HTMLElement } | null>(null)
let observer: ResizeObserver | null = null
let observed: HTMLElement | null = null

// Keep --header-height in sync with the real fixed header height so hero
// content and scroll-padding always clear it (the mobile header is taller
// than the old static 60px/120px values). Self-healing: the header root is
// swapped by v-if at the 850px breakpoint, so always re-read the live element.
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