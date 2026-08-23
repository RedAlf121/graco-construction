<template>
  <section class="px-4 py-12 md:py-16 lg:py-20">
    <div class="mx-auto max-w-7xl">
      <SectionHeader
        title="About Us"
        subtitle="Building excellence with integrity since 2014"
      />

      <p class="mx-auto mt-8 max-w-4xl text-center text-base text-white/80 md:text-lg leading-relaxed animate-fadeInUp">
        Graco Construction Group has been a trusted name in Florida's construction industry since 2014.
        With over 25 years of professional experience, we bring unmatched expertise to every project.
        Our foundation is built on ethics-based client relationships, unwavering professionalism,
        and a commitment to delivering exceptional results. From residential renovations to
        large-scale commercial developments, we transform visions into architectural realities
        with precision, integrity, and care.
      </p>

      <div class="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(card, index) in differentiators"
          :key="card.title"
          class="group rounded-none border border-white/10 bg-background-tertiary p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card-3d-hover hover:-translate-y-1 border-t-2 border-primary/30 shadow-card-3d"
          :class="`animate-fadeInUp [animation-delay:${index * 100}ms]`"
        >
          <div class="mb-4 flex size-14 items-center justify-center rounded-none bg-primary/10 text-2xl text-primary">
            <i :class="['fas', card.icon]"></i>
          </div>
          <h3 class="mb-2 text-lg font-bold text-white">{{ card.title }}</h3>
          <p class="text-sm text-white/70 leading-relaxed">{{ card.description }}</p>
        </div>
      </div>

      <div class="mt-16">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '../SectionHeader.vue'
import TeamCard from '../team/TeamCard.vue'

interface Differentiator {
  icon: string
  title: string
  description: string
}

interface TeamMember {
  name: string
  image: string
  delay: number
}

const differentiators: Differentiator[] = [
  {
    icon: 'fa-hard-hat',
    title: 'Experience',
    description: 'Over 25 years in the construction industry with a proven track record of successful projects across Florida.'
  },
  {
    icon: 'fa-medal',
    title: 'Quality',
    description: 'Uncompromising standards in materials, workmanship, and project execution from foundation to finish.'
  },
  {
    icon: 'fa-handshake',
    title: 'Ethics',
    description: 'Honest, transparent client relationships built on trust, integrity, and clear communication at every stage.'
  },
  {
    icon: 'fa-lightbulb',
    title: 'Innovation',
    description: 'Modern construction techniques and design solutions that push boundaries while respecting budgets and timelines.'
  },
  {
    icon: 'fa-star',
    title: 'Client Satisfaction',
    description: 'Dedicated to exceeding expectations with personalized service and meticulous attention to client needs.'
  },
  {
    icon: 'fa-shield-halved',
    title: 'Safety',
    description: 'Rigorous safety protocols and OSHA-compliant practices protecting our team, clients, and job sites.'
  }
]

const teamMembers: TeamMember[] = [
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
