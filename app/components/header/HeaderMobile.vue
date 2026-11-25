<template>
  <header class="bg-black/98 backdrop-blur-xl border-b border-white/10 
                 px-[clamp(0.75rem,2vw,1.25rem)] py-[clamp(0.375rem,1vmin,0.625rem)] flex justify-between items-center -webkit-backdrop-blur-xl">
    
    <div class="flex min-w-0 items-center gap-[clamp(0.5rem,1.5vw,0.75rem)]">
      <Logo :url="'/logo graco.png'" :alt="'Graco logo'" :icon-class="'h-[clamp(2.25rem,7vmin,3rem)] w-[clamp(2.25rem,7vmin,3rem)] shrink-0 object-contain drop-shadow-lg'" />
      <h1 class="max-w-[clamp(10rem,48vw,22rem)] leading-tight text-[clamp(0.875rem,2.6vw,1.125rem)] font-bold tracking-tight text-white">
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
