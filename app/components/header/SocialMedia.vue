<template>
	<div class="flex gap-3 bg-background-tertiary items-center p-2 rounded-none">
		<template v-for="link in socialLinks">
			<SocialMediaLink :link="link.link" :background="link.background" :icon="link.icon" :label="link.label" :color="link.color" />
		</template>
	</div>
</template>


<script setup lang="ts">
import SocialMediaLink from './SocialMediaLink.vue'

interface SocialLink {
	link: string,
	icon: string
	background: string
	label: string,
	color: string
}

const socialLinks: Array<SocialLink> = [
	{ link: "#", icon: "fa-facebook-f", background: "facebook", label: "Facebook", color:'hover:bg-[#1877F2]'},
	{ link: "#", icon: "fa-instagram", background: "instagram", label: "Instagram", color:'hover:bg-gradient-to-br hover:from-[#405DE6] hover:via-[#5851DB] hover:to-[#FD1D1D] hover:via-[#833AB4] hover:via-[#C13584] hover:via-[#E1306C]' },
	{ link: "#", icon: "fa-linkedin", background: "linkedin", label: "LinkedIn", color: 'hover:bg-[#0077B5]' },
	{ link: "#", icon: "fa-whatsapp", background: "whatsapp", label: "WhatsApp", color: 'hover:bg-[#25D366]' },

]
</script>