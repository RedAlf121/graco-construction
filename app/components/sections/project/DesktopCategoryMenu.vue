<template>
  <div class="space-y-6 z-20">
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
            @click.prevent="onSubClick(sub.id)"
          >
            {{ sub.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  categories: any[]
  activeCategory: string
}>()

const emit = defineEmits<{
  (e: 'update:active-category', value: string): void
}>()

const onSubClick = (id: string) => {
  emit('update:active-category', id)
  scrollTo(id)
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>