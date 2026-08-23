<template>
  <div class="flex justify-center gap-3 mt-8 pt-8 border-t border-white/10">
    <template v-for="social in socialLinks" :key="social.label">
      <a 
        :href="social.link"
        :aria-label="social.label"
        class="inline-flex items-center justify-center w-11 h-11 
               bg-white/10 rounded-full border border-white/10 text-white 
               text-lg transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
               hover:scale-110 hover:-translate-y-1"
        :class="{
          'hover:bg-[#1877F2] hover:border-[#1877F2]': social.background === 'facebook',
          'hover:bg-gradient-to-br hover:from-[#405DE6] hover:via-[#833AB4] hover:to-[#FD1D1D] hover:border-transparent': social.background === 'instagram',
          'hover:bg-[#0077B5] hover:border-[#0077B5]': social.background === 'linkedin',
          'hover:bg-[#25D366] hover:border-[#25D366]': social.background === 'whatsapp'
        }">
        <i class="fab" :class="social.icon"></i>
      </a>
    </template>
  </div>
</template>

<script setup>
defineProps({
  socialLinks: Array
})
</script>