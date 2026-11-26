<template>
  <div 
    @click="$emit('close')"
    class="fixed top-0 left-0 w-full h-full bg-black/80 z-[1000]">
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>