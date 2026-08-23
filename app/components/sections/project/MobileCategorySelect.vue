<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ServiceNode } from '~/hooks/useServices'

const props = defineProps<{
  services: ServiceNode[]
  activeCategory: string
}>()

const emit = defineEmits<{
  (e: 'update:active-category', value: string): void
}>()

const selectedValue = ref(props.activeCategory)

watch(() => props.activeCategory, (val) => {
  selectedValue.value = val
})

const optionGroups = computed(() => {
  return props.services.map(service => ({
    label: service.name,
    options: (service.children || []).map((child: ServiceNode) => ({
      value: child.id,
      label: child.name
    }))
  }))
})

const onSelectChange = () => {
  emit('update:active-category', selectedValue.value)
  scrollTo(selectedValue.value)
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>