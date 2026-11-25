<template>
  <section
    id="contact"
    class="px-6 py-24"
  >
    <div class="container mx-auto px-4">
      <SectionHeader
        title="Contact Us"
        subtitle="Let's transform your vision into architectural reality"
      />

      <div class="fade-in-up mx-auto mt-8 max-w-[800px]">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from '../SectionHeader.vue'
import ContactForm from './ContactForm.vue'
</script>