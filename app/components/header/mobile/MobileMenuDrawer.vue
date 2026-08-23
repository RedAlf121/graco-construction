<template>
  <div 
    class="fixed top-0 right-0 w-full max-w-[350px] h-screen 
           bg-gradient-to-b from bg-background-primary to bg-background-secondary backdrop-blur-2xl border-l-2 border-white/10 
           shadow-[-10px_0_30px_rgba(0,0,0,0.7)] p-6 pt-20 z-[1001] 
           transition-all duration-400 ease-in-out overflow-y-auto
           -webkit-backdrop-blur-2xl"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})
</script>