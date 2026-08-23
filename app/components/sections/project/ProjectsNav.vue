<template>
  <div>
    <!-- MODO MÓVIL / TABLET: Select desplegable sticky (dentro de la sección) -->
    <div
      v-if="!isDesktop"
      class="sticky top-16 z-20 -mx-4 bg-[#1C1C1E] px-4 py-3 shadow-lg backdrop-blur-sm md:top-20"
    >
      <label for="category-select" class="sr-only">Navegar por proyectos</label>
      <select
        id="category-select"
        v-model="selectedValue"
        class="w-full rounded-none border border-white/10 bg-white/5 p-3 font-['Inter',sans-serif] text-base text-white focus:border-[#FF9F0A] focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]/20"
        @change="onSelectChange"
      >
        <optgroup label="Design">
          <option value="design-residential">Residential Design</option>
          <option value="design-commercial">Commercial Design</option>
        </optgroup>
        <optgroup label="Build">
          <option value="build-residential">Residential Construction</option>
          <option value="build-commercial">Commercial Construction</option>
        </optgroup>
      </select>
    </div>

    <!-- MODO ESCRITORIO: Menú lateral jerárquico sticky -->
    <div v-else class="space-y-6 z-20]">
      <div v-for="category in categories" :key="category.id" class="space-y-2">
        <h4 class="font-['Manrope',sans-serif] text-sm font-semibold uppercase tracking-wider text-white/60">
          {{ category.name }}
        </h4>
        <ul class="space-y-1 border-l border-white/10 pl-3">
          <li v-for="sub in category.children" :key="sub.id">
            <a
              :href="`#${sub.id}`"
              class="block py-1.5 text-sm transition-colors hover:text-[#FF9F0A]"
              :class="activeCategory === sub.id ? 'font-medium text-[#FF9F0A]' : 'text-white/70'"
              @click.prevent="scrollTo(sub.id)"
            >
              {{ sub.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  categories: any[]
  activeCategory: string
}>()

const emit = defineEmits<{
  (e: 'update:active-category', value: string): void
}>()

// Detectar escritorio (Tailwind lg = 1024px)
const isDesktop = ref(false)
const checkDesktop = () => {
  isDesktop.value = window.innerWidth >= 1024
}
onMounted(() => {
  checkDesktop()
  window.addEventListener('resize', checkDesktop)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkDesktop)
})

// Select reactivo
const selectedValue = ref(props.activeCategory)
watch(() => props.activeCategory, (val) => {
  selectedValue.value = val
})

const onSelectChange = () => {
  emit('update:active-category', selectedValue.value)
  scrollTo(selectedValue.value)
}

// Scroll suave a la subcategoría
const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  emit('update:active-category', id)
}
</script>