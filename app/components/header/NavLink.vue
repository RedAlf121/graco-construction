<template>
  <NuxtLink :to="path" 
    class="group relative text-[#EBEBF5] no-underline 
           text-[clamp(0.6875rem,1.15vmin,0.875rem)] font-extrabold
           px-[clamp(0.75rem,1.25vw,1.5rem)] py-[clamp(0.625rem,1.5vmin,0.875rem)]
           rounded-none transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] 
           flex items-center gap-2 lg:gap-2 xl:gap-3 
           bg-white/[0.03] min-w-[clamp(5.75rem,9vw,8.75rem)]
           justify-center overflow-hidden border border-transparent 
           uppercase tracking-wider
           hover:text-white hover:bg-white/5 hover:border-white/10
           before:content-[''] before:absolute before:top-0 before:-left-full 
           before:w-full before:h-full before:bg-gradient-to-r 
           before:from-transparent before:via-white/10 before:to-transparent 
           before:transition-all before:duration-600 before:ease-in-out 
           before:z-10 hover:before:left-full"
    :class="{ 'text-white bg-white/5 border-white/10': isActive }">
    
    <i class="fas text-sm lg:text-sm xl:text-base opacity-80 
              transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
              group-hover:opacity-100 group-hover:text-[#FF9F0A]"
       :class="[icon, isActive ? 'opacity-100 text-[#FF9F0A] animate-pulse' : '']"></i>
    
    <span class="relative z-20 transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] 
                group-hover:-translate-y-px"
          :class="{ '-translate-y-px': isActive }">
      {{ title }}
    </span>
    
    <div v-if="isActive" 
         class="absolute bottom-0 left-0 w-full h-[3px] 
                bg-gradient-to-r from-[#FF9F0A] to-[#FFB340] 
                z-[2] shadow-[0_0_10px_rgba(255,159,10,0.5)]"></div>
    
    <div class="absolute inset-0 bg-gradient-to-br from-[#FF9F0A]/15 to-[#0A84FF]/8 
                opacity-0 transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] 
                group-hover:opacity-100 z-0"
         :class="{ 'opacity-100': isActive }"></div>
    
    <div class="absolute top-1/2 left-1/2 w-0 h-0 
                bg-[radial-gradient(circle,rgba(255,159,10,0.3),transparent_70%)] 
                rounded-full -translate-x-1/2 -translate-y-1/2 
                opacity-0 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] 
                pointer-events-none z-0 
                group-hover:w-[200px] group-hover:h-[200px] group-hover:opacity-40"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Properties {
  path: string
  title: string
  icon: string
}

const props = defineProps<Properties>()
const route = useRoute()

const isActive = computed(() => route.path === props.path)
</script>
