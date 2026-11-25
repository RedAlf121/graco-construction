import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(threshold = 0.2, once = true) {
  const targetRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  function observe() {
    if (!targetRef.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (once) observer?.unobserve(entry.target)
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold }
    )
    observer.observe(targetRef.value)
  }

  onMounted(() => {
    if (targetRef.value) observe()
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { targetRef, isVisible }
}
