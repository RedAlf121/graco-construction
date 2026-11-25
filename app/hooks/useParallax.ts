import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed: number = 0.3) {
  const containerRef = ref<HTMLElement | null>(null)
  const translateY = ref(0)

  function isMobile(): boolean {
    if (import.meta.server) return false
    return window.innerWidth < 768
  }

  function update() {
    if (!containerRef.value || isMobile()) {
      translateY.value = 0
      return
    }

    const rect = containerRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const totalScroll = rect.height + windowHeight
    const scrolled = windowHeight - rect.top
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
    translateY.value = (progress - 0.5) * speed * rect.height * -1
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return { containerRef, translateY }
}
