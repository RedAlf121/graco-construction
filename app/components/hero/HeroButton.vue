<template>
  <NuxtLink
    :to="$props.path"
    class="uppercase font-extrabold tracking-wide text-[16px] px-8 py-4
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