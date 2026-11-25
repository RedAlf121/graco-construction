<template>
  <div class="container mx-auto px-4">
    <div class="mb-8 text-center md:mb-12">
      <h2
        v-if="title"
        class="font-['Manrope',sans-serif] font-bold uppercase tracking-[0.15em] text-white/90 drop-shadow-lg"
        :class="[
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
          'mb-3 md:mb-4',
        ]"
      >
        {{ title }}
      </h2>
      <p
        v-if="subtitle"
        class="mx-auto max-w-3xl font-light leading-relaxed text-white/80 drop-shadow-md"
        :class="[
          'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl',
        ]"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()
</script>