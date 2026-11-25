<template>
  <section id="home" class="relative w-full min-h-screen min-h-svh text-white">
    <!-- Media layer: single video + poster; knockout title blends inside -->
    <TextWithVideo :poster="poster">
      <div :class="columnClasses" class="hero-knockout absolute inset-0 bg-background-tertiary mix-blend-multiply">
        <Logo v-bind="logoProps" class="invisible" aria-hidden="true" />
        <h1 :class="titleClasses">{{ title }}</h1>
        <HeroButton v-bind="buttonProps" class="invisible" aria-hidden="true" />
      </div>
    </TextWithVideo>

    <!-- Content layer: real logo/CTA; invisible title twin keeps exact alignment -->
    <div :class="columnClasses" class="relative z-10">
      <Logo v-bind="logoProps" />
      <div :class="titleClasses" class="invisible" aria-hidden="true">{{ title }}</div>
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
  'flex min-h-screen min-h-svh flex-col items-center justify-center gap-6 px-4 pb-16 pt-[calc(var(--header-height)+1rem)] [@media(max-height:500px)]:gap-3 [@media(max-height:500px)]:pb-6 [@media(max-height:500px)]:pt-[calc(var(--header-height)+0.5rem)]'

const titleClasses =
  'text-center font-montserrat font-black tracking-tight text-white text-[clamp(2.5rem,8vw,6rem)]'

const logoProps = {
  url: '/logo graco.png',
  alt: 'Graco logo',
  iconClass: 'size-32 md:size-48 lg:size-64 xl:size-80 drop-shadow-2xl [@media(max-height:500px)]:!size-24',
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
