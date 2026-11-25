<template>
  <div
    class="group rounded-none border border-white/10 bg-background-tertiary p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card-3d-hover hover:-translate-y-1 border-t-2 border-primary/30 shadow-card-3d"
  >
    <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-none bg-primary/10 text-2xl text-primary">
      <i :class="['fas', icon]"></i>
    </div>
    <div class="mb-1 text-2 text-3xl md:text-4xl font-extrabold text-primary">{{ number }}</div>
    <div class="text-sm text-white/70 leading-relaxed">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  number: string
  label: string
  delay?: number
}

defineProps<Props>()
</script>