<template>
  <main class="snap-container bg-gradient-to-l from-background-secondary to-background-primary">
    <section class="snap-section">
      <Hero class="mt-24" />
    </section>
    <section class="snap-section flex items-center justify-center">
      <ProjectsPreview class="text-white w-full" />
    </section>
    <section class="snap-section flex items-center justify-center">
      <Services class="text-white w-full" />
    </section>
    <section class="snap-section">
      <CompanyDescription class="text-white w-full" />
    </section>
    <section class="snap-section flex items-center justify-center">
      <Process class="text-white w-full" />
    </section>
  </main>
</template>

<script setup lang="ts">
import Hero from '../components/hero/Hero.vue'
import Process from '../components/sections/process/Process.vue'
import CompanyDescription from '../components/sections/home/CompanyDescription.vue'
import ProjectsPreview from '../components/sections/home/ProjectsPreview.vue'
import Services from '../components/sections/services/Services.vue'
</script>
