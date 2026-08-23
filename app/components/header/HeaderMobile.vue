<template>
  <header class="bg-black/98 backdrop-blur-xl border-b border-white/10 
                 px-4 py-3 flex justify-between items-center  -webkit-backdrop-blur-xl">
    
    <div class="flex items-center gap-3 mt-4 mb-8 md:mt-0 md:mb-0">
      <Logo :url="'/logo graco.png'" :alt="'Graco logo'" :icon-class="'size-16 md:size-24 drop-shadow-lg'" />
      <h1 class="text-lg md:text-2xl font-bold tracking-tight text-white">
        GRACO CONSTRUCTION GROUP, INC
      </h1>
    </div>

    <MobileHamburgerButton :is-menu-open="isMenuOpen" @toggle="$emit('toggle-menu')" />

    <MobileMenuOverlay v-if="isMenuOpen" @close="$emit('toggle-menu')" />

    <MobileMenuDrawer :is-open="isMenuOpen">
      <MobileNavContent :nav-links="navLinks" />
    </MobileMenuDrawer>
  </header>
</template>

<script setup>
import Logo from '../Logo.vue'
import MobileHamburgerButton from './mobile/MobileHamburgerButton.vue'
import MobileMenuOverlay from './mobile/MobileMenuOverlay.vue'
import MobileMenuDrawer from './mobile/MobileMenuDrawer.vue'
import MobileNavContent from './mobile/MobileNavContent.vue'

defineProps({
  navLinks: Array,
  isMenuOpen: Boolean
})

defineEmits(['toggle-menu'])
</script>
