<template>
	<video
		v-if="!posterOnly"
		class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
		:class="isPlaying ? 'opacity-100' : 'opacity-0'"
		:poster="poster"
		autoplay
		muted
		loop
		playsinline
		preload="metadata"
		@playing="isPlaying = true"
	>
		<source v-for="source in sources" :key="source.src" :src="source.src" :type="source.type" />
	</video>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Properties {
	poster: string
}
defineProps<Properties>()

interface NetworkInformation {
	saveData?: boolean
	effectiveType?: string
}

const MOBILE_BREAKPOINT = 1100

const isMobile = ref(false)
// Start conservative: decide whether to load video only after checking
// connection/motion preferences on the client (component is ClientOnly).
const posterOnly = ref(true)
const isPlaying = ref(false)

onMounted(() => {
	isMobile.value = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches

	const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
	const saveData = connection?.saveData === true
	const slowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	posterOnly.value = saveData || slowConnection || reducedMotion
})

const sources = computed(() =>
	isMobile.value
		? [
				{ src: '/hero-miami-720.webm', type: 'video/webm' },
				{ src: '/hero-miami-720.mp4', type: 'video/mp4' },
			]
		: [{ src: '/hero-miami-1080.mp4', type: 'video/mp4' }]
)
</script>
