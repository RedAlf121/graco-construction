<template>
  <section
    id="team"
    class="px-4 py-12 md:py-16 lg:py-20"
  >
    <div class="container mx-auto px-4">
      <SectionHeader
        title="Our Team"
        subtitle="Professionals committed to excellence in every project"
      />

      <div
        class="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:gap-8 2xl:grid-cols-3"
      >
        <TeamCard
          v-for="member in teamMembers"
          :key="member.name"
          :image="member.image"
          :alt="member.name"
          :delay="member.delay"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '../SectionHeader.vue'
import TeamCard from './TeamCard.vue'

const teamMembers = [
  {
    name: 'Alexander Reig',
    image: '/card-alexander-reig.jpg',
    delay: 0,
  },
  {
    name: 'Marisel Hernandez',
    image: '/card-marisel-hernandez.jpg',
    delay: 100,
  },
  {
    name: 'Tania P Nardo',
    image: '/card-tania-nardo.jpg',
    delay: 200,
  },
  {
    name: 'Alfredo Cabrera',
    image: '/card-alfredo-cabrera.jpg',
    delay: 300,
  },
  {
    name: 'Graciella Medina',
    image: '/card-graciella-medina.jpg',
    delay: 400,
  },
  {
    name: 'Jaqueline Paderni',
    image: '/card-jaquelin-paderni.png',
    delay: 500,
  },
]
</script>