<template>
  <section id="home" class="relative bg-background-primary text-white w-full min-h-screen">

    <div class="absolute inset-0 w-full h-full z-0">
      <ClientOnly>
        <TextWithVideo :video="videoURL" :title="'BUILT TO DELIVER'" />
      </ClientOnly>
    </div>

    <div class="absolute top-72 md:top-60 lg:top-44 xl:top-20 left-1/2 transform -translate-x-1/2 z-50">
      <Logo :url="'/logo graco.png'" :alt="'Graco logo'"
        :icon-class="'size-32 md:size-48 lg:size-64 xl:size-80 drop-shadow-2xl'" />
    </div>
    <div
      class="hero-actions absolute bottom-64 lg:bottom-72 left-1/2 transform -translate-x-1/2 z-50 flex flex-wrap justify-center gap-6 mt-8">
<HeroButton path="/projects" title="Projects" icon="fa-arrow-right" base-color="border-primary-dark
	          bg-gradient-to-br from-primary to-primary-dark
	          shadow-[0_6px_0_0_#D87A00,0_12px_20px_rgba(255,159,10,0.3)]" hover-color="hover:shadow-[0_12px_0_0_#D87A00,0_20px_30px_rgba(255,159,10,0.4)]
	          hover:bg-gradient-to-br hover:from-primary-light hover:to-primary
	          active:-translate-y-[2px] active:shadow-[0_4px_0_0_#D87A00,0_8px_15px_#D87A00 rgba(255,159,10,0.2)]" />
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TextWithVideo from './TextWithVideo.vue';
import Logo from '../Logo.vue';
import HeroButton from './HeroButton.vue'

const videoURL = ref('/toma aerea de miami webm.webm')
</script>
