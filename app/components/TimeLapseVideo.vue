<template>
  <section
    class="relative my-24 h-[65vh] overflow-hidden lg:my-32 lg:h-[70vh]"
  >
    <!-- Contenedor con clip-path asimétrico + marco -->
    <div
      class="relative h-full w-full"
      :class="[
        // Clip-path irregular: puntos desplazados para asimetría
        '[clip-path:polygon(0_8%,100%_2%,100%_92%,0_98%)]',
        // Sombra exterior para dar relieve (la ventana sobresale)
        'shadow-[0_20px_30px_-10px_rgba(0,0,0,0.7)]',
      ]"
    >

      <!-- Video (la vista a través de la ventana) -->
      <video
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="h-full w-full object-cover brightness-[0.3]"
      >
        <source :src="video" type="video/webm" />
      </video>

      <!-- Capa de texto (siempre sobre el video) -->
      <div
        class="absolute inset-0 z-20 flex flex-col justify-center pl-[10%] pr-4 md:pl-[12%] lg:pl-[15%]"
        :class="'[clip-path:polygon(0_8%,100%_2%,100%_92%,0_98%)]'"
      >
        <div
          class="font-['Manrope',sans-serif] font-black leading-tight text-white drop-shadow-2xl"
          :class="[
            'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
            'mb-4 md:mb-6',
            '[text-shadow:0_4px_20px_rgba(0,0,0,0.8)]',
          ]"
        >
          We transform visions into architectural realities
        </div>
        <p
          class="font-['Manrope',sans-serif] font-light text-white/80 drop-shadow-xl"
          :class="[
            'text-xl sm:text-2xl md:text-3xl lg:text-[1.8rem]',
            'max-w-3xl',
            '[text-shadow:0_2px_10px_rgba(0,0,0,0.8)]',
          ]"
        >
          Specialists in high-end residential and commercial projects
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Properties {
  video: string
}

defineProps<Properties>()
</script>