<template>
  <header>
    <div class="flex items-center gap-3 mt-4 mb-8 md:mt-0 md:mb-0">
      <Logo :url="'/logo graco.png'" :alt="'Graco logo'" :icon-class="'size-24'" />
      <h1 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white">
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
