<template>
  <div class="flex flex-col gap-1 mt-8 bg-black/70 border-2 border-white/10 p-1">
    <template v-for="(link, index) in navLinks" :key="link.path">
      <MobileNavLink :link="link" />
      <div 
        v-if="index < navLinks.length - 1"
        class="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent my-1 self-center">
      </div>
    </template>
  </div>
</template>

<script setup>
import MobileNavLink from './MobileNavLink.vue'

defineProps({
  navLinks: Array
})
</script>
