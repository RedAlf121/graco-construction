<template>
  <button 
    @click="$emit('toggle')"
    class="shrink-0 bg-transparent border-none text-white p-2
           cursor-pointer z-[1002] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
           hover:text-[#FF9F0A] focus:outline-none"
    :class="{ 'text-[#FF9F0A]': isMenuOpen }"
    aria-label="Toggle menu">
    <i :class="isMenuOpen ? 'fas fa-times text-2xl' : 'fas fa-bars text-2xl'"></i>
  </button>
</template>

<script setup>
defineProps({
  isMenuOpen: Boolean
})

defineEmits(['toggle'])
</script>