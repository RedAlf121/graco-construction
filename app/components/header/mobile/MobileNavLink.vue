<template>
  <NuxtLink :to="link.path" @click="handleClick" class="group relative text-[#EBEBF5] no-underline text-sm
           font-extrabold px-5 py-4 rounded-none uppercase tracking-wider
           border border-transparent flex items-center gap-3 z-[1] overflow-hidden
           transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
           bg-white/5 border-white/10" :class="{
            'text-white bg-white/10 border-white/20': isActive
          }">

    <i class="fas text-lg opacity-80 transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
             group-hover:opacity-100 group-hover:text-[#FF9F0A]"
      :class="[link.icon, isActive ? 'opacity-100 text-[#FF9F0A] animate-pulse' : '']">
    </i>

    <span class="relative z-[2] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
             group-hover:translate-x-1" :class="{ 'translate-x-1': isActive }">
      {{ link.title }}
    </span>

    <div v-if="isActive" class="absolute left-0 top-0 h-full w-[3px] 
         bg-gradient-to-r from-[#FF9F0A] to-[#FFB340] 
         z-[2] shadow-[0_0_10px_rgba(255,159,10,0.5)]">
    </div>

    <div class="absolute inset-0 bg-gradient-to-br from-[#FF9F0A]/15 to-[#0A84FF]/08 opacity-0 
             transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] z-[1]
             group-hover:opacity-100" :class="{ 'opacity-100': isActive }">
    </div>

    <div class="absolute top-0 -left-full w-full h-full 
             bg-gradient-to-r from-transparent via-white/10 to-transparent 
             transition-all duration-600 ease-in-out z-[1] 
             group-hover:left-full">
    </div>

    <div class="absolute top-1/2 left-1/2 w-0 h-0 
             bg-[radial-gradient(circle,rgba(255,159,10,0.3),transparent_70%)] 
             rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 
             transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] 
             pointer-events-none z-0 
             group-hover:w-[200px] group-hover:h-[200px] group-hover:opacity-40">
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  link: Object
})

const route = useRoute()

const isActive = computed(() => route.path === props.link.path)

const handleClick = () => {
  // Mobile menu will close via the overlay/close mechanism
}
</script>
