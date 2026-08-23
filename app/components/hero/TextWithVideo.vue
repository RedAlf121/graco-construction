<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Video de fondo -->
    <BackgroundVideo :video="$props.video" />
    
    <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-1"></div>
    
    <!-- Texto con máscara SVG -->
    <TextMask :video="$props.video" :title="$props.title" />

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import BackgroundVideo from './BackgroundVideo.vue'
import TextMask from './TextMask.vue'
interface Properties {
  video: string,
  title: string
}
defineProps<Properties>()
</script>
