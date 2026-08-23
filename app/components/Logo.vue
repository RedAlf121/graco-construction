<template>
	<a href="#">
		<img :src="$props.url" :alt="$props.alt" :class="$props.iconClass">
	</a>
</template>

<script setup lang="ts">


interface Properties{
	url: string,
	alt: string,
	iconClass: string,
}

defineProps<Properties>()

</script>
