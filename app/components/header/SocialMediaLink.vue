<template>
  <a 
    :href="$props.link" 
    :aria-label="$props.label"
    class="header-social-link inline-flex items-center justify-center w-9 h-9 
           bg-white/10 rounded-full text-gray-100 no-underline transition-all 
           duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] text-sm hover:-translate-y-0.5"
    :class="$props.color">
    <i class="fab" :class="$props.icon"></i>
  </a>
</template>

<script setup lang="ts">
interface Properties {
  link: string,
  icon: string
  background: string
  label: string
  color: string
}

defineProps<Properties>();
</script>