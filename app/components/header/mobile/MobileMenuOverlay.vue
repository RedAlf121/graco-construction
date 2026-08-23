<template>
  <div 
    @click="$emit('close')"
    class="fixed top-0 left-0 w-full h-full bg-black/80 z-[1000] 
           transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]">
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>