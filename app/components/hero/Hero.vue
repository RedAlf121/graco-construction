<template>
  <section id="home" class="relative w-full min-h-screen min-h-svh text-white">
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
      <div :class="titleClasses" class="pointer-events-none select-none text-white/15" aria-hidden="true">{{ title }}</div>
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
  'flex min-h-screen min-h-svh flex-col items-center justify-center gap-6 px-4 pb-16 pt-[calc(var(--header-height)+1rem)] [@media(max-height:500px)]:gap-2 [@media(max-height:500px)]:pb-2 [@media(max-height:500px)]:pt-[calc(var(--header-height)+0.25rem)]'

const titleClasses =
  'text-center font-montserrat font-black tracking-tight text-white text-[clamp(2.5rem,8vw,6rem)] [@media(max-height:500px)]:leading-none [@media(max-height:500px)]:[font-size:clamp(1.75rem,13vh,6rem)]'

const logoProps = {
  url: '/logo graco.png',
  alt: 'Graco logo',
  iconClass: 'w-[clamp(10.45rem,28.5vw,19rem)] drop-shadow-2xl [@media(max-height:500px)]:!w-[min(28.5vw,30vh)]',
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
