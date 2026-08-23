<template>
  <div
    class="rounded-none border border-white/5 bg-[#2C2C2E] shadow-lg backdrop-blur-xl"
    :class="[
      'p-6 sm:p-8 lg:p-12',
    ]"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6 lg:space-y-8">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <!-- Full Name -->
        <div>
          <label for="name" class="mb-2 block text-sm font-semibold text-white sm:text-[15px]">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            class="form-input w-full rounded-none border border-white/10 bg-white/5 p-3.5 font-['Inter',sans-serif] text-base text-white transition-all placeholder:text-white/40 focus:border-[#FF9F0A] focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]/10 sm:p-4"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="mb-2 block text-sm font-semibold text-white sm:text-[15px]">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            class="form-input w-full rounded-none border border-white/10 bg-white/5 p-3.5 font-['Inter',sans-serif] text-base text-white transition-all placeholder:text-white/40 focus:border-[#FF9F0A] focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]/10 sm:p-4"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <!-- Phone -->
        <div>
          <label for="phone" class="mb-2 block text-sm font-semibold text-white sm:text-[15px]">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (123) 456-7890"
            class="form-input w-full rounded-none border border-white/10 bg-white/5 p-3.5 font-['Inter',sans-serif] text-base text-white transition-all placeholder:text-white/40 focus:border-[#FF9F0A] focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]/10 sm:p-4"
          />
        </div>

        <!-- Project Type -->
        <div>
          <label for="service" class="mb-2 block text-sm font-semibold text-white sm:text-[15px]">
            Project Type
          </label>
          <div class="relative">
            <select
              id="service"
              class="form-select w-full appearance-none rounded-none border border-white/10 bg-white/5 p-3.5 font-['Inter',sans-serif] text-base text-white transition-all placeholder:text-white/40 focus:border-[#FF9F0A] focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]/10 sm:p-4 [&>option]:bg-[#2C2C2E] [&>option]:text-white"
              required
            >
              <option value="" disabled selected>Select Service</option>
              <option value="residential-design">Residential Design</option>
              <option value="commercial-design">Commercial Design</option>
              <option value="residential-build">Residential Construction</option>
              <option value="commercial-build">Commercial Construction</option>
              <option value="concrete-restoration">Concrete Restoration</option>
              <option value="medical-facilities">Medical Facilities</option>
              <option value="recertification">40 Year Recertification</option>
            </select>
            <!-- Flecha SVG -->
            <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="mb-2 block text-sm font-semibold text-white sm:text-[15px]">
          Message
        </label>
        <textarea
          id="message"
          rows="6"
          placeholder="Tell us about your project, needs, and expectations..."
          class="form-input w-full min-h-[120px] resize-y rounded-none border border-white/10 bg-white/5 p-3.5 font-['Inter',sans-serif] text-base text-white transition-all placeholder:text-white/40 focus:border-[#FF9F0A] focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-[#FF9F0A]/10 sm:p-4 sm:min-h-[150px]"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        class="flex w-full items-center justify-center gap-3 rounded-none bg-gradient-to-r from-[#FF9F0A] to-[#E68900] p-4 text-base font-bold text-[#1C1C1E] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,159,10,0.4)] sm:p-5 sm:text-lg"
      >
        <i class="fas fa-paper-plane"></i>
        <span>Send Message</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = () => {
}
</script>