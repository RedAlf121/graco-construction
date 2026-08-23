import { ref, type CSSProperties } from 'vue'

export function useTilt(maxTilt = 10) {
  const cardRef = ref<HTMLElement | null>(null)
  const tiltStyle = ref<CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  })

  function onMouseMove(e: MouseEvent) {
    if (!cardRef.value) return
    const rect = cardRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt
    tiltStyle.value = {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    }
  }

  function onMouseLeave() {
    tiltStyle.value = {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }

  return { cardRef, tiltStyle, onMouseMove, onMouseLeave }
}
