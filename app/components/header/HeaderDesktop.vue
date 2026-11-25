<template>
  <header class="flex w-full items-center justify-between px-[clamp(1rem,3vw,3rem)]">
    <div class="flex items-center gap-[clamp(0.5rem,1vmin,0.75rem)]">
      <Logo :url="'/logo graco.png'" :alt="'Graco logo'" :icon-class="'h-[clamp(3.25rem,7vmin,4.25rem)] w-[clamp(3.25rem,7vmin,4.25rem)] object-contain'" />
      <h1 class="text-[clamp(0.875rem,1.45vmin,1.125rem)] font-bold tracking-tight text-white leading-tight">
        <span class="block text-center">GRACO CONSTRUCTION</span>
        <span class="block ">GROUP INC</span>
      </h1>

    </div>
    <NavMenu :nav-links="navLinks" />

  </header>
</template>

<script setup>
import Logo from '../Logo.vue'
import NavMenu from './NavMenu.vue'

defineProps({
  navLinks: Array
})
</script>
