<template>
	<!-- Media layer: poster paints instantly (CSS background), single video on top.
	     `isolate` keeps the knockout blend contained; fallback color avoids a black void. -->
	<div
		class="absolute inset-0 isolate overflow-hidden bg-background-secondary bg-cover bg-center"
		:style="{ backgroundImage: `url(${poster})` }"
	>
		<ClientOnly>
			<BackgroundVideo :poster="poster" />
		</ClientOnly>

		<!-- Knockout layer (title + spacers) provided by Hero via slot -->
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import BackgroundVideo from './BackgroundVideo.vue'

interface Properties {
	poster: string
}
defineProps<Properties>()
</script>
