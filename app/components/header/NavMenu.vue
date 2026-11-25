<template>
  <nav class="flex w-fit h-fit justify-center items-center gap-0.5 bg-black/70 border-2 border-white/10 
              shadow-[0_8px_32px_rgba(0,0,0,0.8)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]
              rounded-none p-0.5 relative z-[1000]">
    
    <template v-for="(link, index) in navLinks" :key="link.path">
      <div class="relative">
        <NavLink 
          :path="link.path" 
          :title="link.title" 
          :icon="link.icon" />
      </div>
      
      <div v-if="index < navLinks.length - 1" 
           class="w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent 
                  mx-0.5 self-center"></div>
    </template>
  </nav>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue'

defineProps({
  navLinks: Array
})
</script>
