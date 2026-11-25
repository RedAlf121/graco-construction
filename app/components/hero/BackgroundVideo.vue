<template>
	<video class="absolute top-0 left-0 w-full h-full object-cover" autoplay muted loop playsinline preload="auto">
	      <source :src="$props.video" type="video/webm">
	    </video>
</template>

<script setup lang="ts">
interface Properties {
  video: string
}
defineProps<Properties>()
</script>
