<template>
  <section id="home" class="relative w-full min-h-screen min-h-svh [@media(max-width:1100px)]:min-h-[82svh] text-white">
    <!-- Media layer: single video + poster; knockout title blends inside -->
    <TextWithVideo :poster="poster">
      <div :class="columnClasses" class="hero-knockout absolute inset-0 bg-gray-1 mix-blend-multiply">
        <Logo v-bind="logoProps" class="invisible" aria-hidden="true" />
        <h1 :class="titleClasses">{{ title }}</h1>
        <HeroButton v-bind="buttonProps" class="invisible" aria-hidden="true" />
      </div>
    </TextWithVideo>

    <!-- Content layer: real logo/CTA; the title twin doubles as a subtle white
         veil so the knockout letters stay legible over dark parts of the video -->
    <div :class="columnClasses" class="relative z-10">
      <Logo v-bind="logoProps" />
      <div :class="titleClasses" class="pointer-events-none select-none text-white/60 drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]" aria-hidden="true">{{ title }}</div>
      <HeroButton v-bind="buttonProps" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TextWithVideo from './TextWithVideo.vue'
import Logo from '../Logo.vue'
import HeroButton from './HeroButton.vue'

const title = 'BUILT TO DELIVER'
const poster = '/hero-miami-poster.webp'

// Shared by both layers so the knockout title aligns exactly with the
// invisible title twin in the content column (visibility:hidden keeps metrics).
const columnClasses =
  'grid min-h-screen min-h-svh [@media(max-width:1100px)]:min-h-[82svh] grid-rows-[auto_auto_auto] content-center items-center justify-items-center gap-[clamp(0.8125rem,3.25vmin,1.625rem)] px-4 pb-[clamp(2rem,8vmin,4rem)] pt-[calc(var(--header-height)+1rem)] [@media(max-height:500px)]:gap-2 [@media(max-height:500px)]:pb-2 [@media(max-height:500px)]:pt-[calc(var(--header-height)+0.25rem)]'

const titleClasses =
  'whitespace-nowrap text-center font-montserrat font-black tracking-tight text-white text-[clamp(1.25rem,7vw,5rem)] [@media(max-height:500px)]:leading-none [@media(max-height:500px)]:[font-size:clamp(1.25rem,8vh,3.5rem)]'

const logoProps = {
  url: '/logo-graco-cropped.png',
  alt: 'Graco logo',
  iconClass: 'w-[clamp(8rem,25vw,16rem)] drop-shadow-2xl [@media(max-height:500px)]:!w-[clamp(7.5rem,24vh,12rem)]',
}

const buttonProps = {
  path: '/projects',
  title: 'Projects',
  icon: 'fa-arrow-right',
  baseColor: `border-primary-dark
    bg-gradient-to-br from-primary to-primary-dark
    shadow-[0_6px_0_0_#D87A00,0_12px_20px_rgba(255,159,10,0.3)]`,
  hoverColor: `hover:shadow-[0_12px_0_0_#D87A00,0_20px_30px_rgba(255,159,10,0.4)]
    hover:bg-gradient-to-br hover:from-primary-light hover:to-primary
    active:-translate-y-[2px] active:shadow-[0_4px_0_0_#D87A00,0_8px_15px_rgba(255,159,10,0.2)]`,
}

useHead({
  link: [{ rel: 'preload', as: 'image', href: poster }],
})
</script>
