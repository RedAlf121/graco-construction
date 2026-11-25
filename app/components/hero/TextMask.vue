<template>
	<div class="absolute inset-0 z-10 pointer-events-none">
		<svg class="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
			<defs>
				<clipPath id="textClipPath" clipPathUnits="userSpaceOnUse">
					<text :x="textX" y="50%" text-anchor="middle" dominant-baseline="middle"
						class="font-black font-montserrat tracking-tight fill-white" font-size="clamp(4rem, 4vw, 5rem)">
						{{ $props.title }}
					</text>
				</clipPath>
			</defs>

			<!-- Video dentro del texto -->
			<foreignObject x="0" y="0" width="1920" height="1080" clip-path="url(#textClipPath)">
				<video class="w-full h-full object-cover filter brightness-200 saturate-125 contrast-75" autoplay muted
					loop playsinline preload="auto">
					<source :src="$props.video" type="video/webm">
				</video>
			</foreignObject>

			<!-- Overlay blanco sutil para efecto tenue -->
			<rect x="0" y="0" width="1920" height="1080" fill="white" opacity="0.15" clip-path="url(#textClipPath)" />
		</svg>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Properties {
	video: string
	title: string
}
defineProps<Properties>()

const textX = ref('50%')


</script>
