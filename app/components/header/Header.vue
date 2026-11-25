<template>
  <HeaderMobile
    v-if="isMobile"
    :nav-links="navLinks"
    :is-menu-open="isMobileMenuOpen"
    @toggle-menu="toggleMobileMenu"
  />
  <HeaderDesktop
    v-else
    :nav-links="navLinks"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeaderDesktop from './HeaderDesktop.vue'
import HeaderMobile from './HeaderMobile.vue'

const navLinks = [
  { path: '/', title: 'Home', icon: 'fa-home' },
  { path: '/projects', title: 'Portfolio', icon: 'fa-hard-hat' },
  { path: '/about', title: 'About Us', icon: 'fa-users' },
  { path: '/contact', title: 'Contact', icon: 'fa-envelope' },
  //{ path: '/team', title: 'Team', icon: 'fa-users' }
]

const isMobile = ref(false)
const isMobileMenuOpen = ref(false)

const MOBILE_BREAKPOINT = 850

const checkMobile = () => {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  if (!isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>
