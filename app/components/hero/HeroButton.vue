<template>
  <NuxtLink
    :to="$props.path"
    class="inline-flex items-center justify-center uppercase font-extrabold tracking-wide text-[clamp(0.8125rem,1.5vmin,1rem)] px-[clamp(1.625rem,4vmin,2.125rem)] py-[clamp(0.8125rem,1.8vmin,1.0625rem)]
              text-black border-2
              transition-transform duration-200 ease-in-out
              hover:-translate-y-[6px]"
    :class="`${$props.baseColor} ${$props.hoverColor}`"
  >
    <span class="mr-2">{{ $props.title }}</span>
    <i class="fas text-[18px] transition-transform duration-300 group-hover:translate-x-[5px]" :class="$props.icon"></i>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Properties{
  title: string,
  icon: string,
  baseColor: string,
  hoverColor: string,
  path: string,
}

defineProps<Properties>();
</script>