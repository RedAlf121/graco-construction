export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
  nitro: {
    prerender: {
      failOnError: false
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Graco Construction Group - Construction & Design in Miami',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Graco Construction Group: Experts in residential and commercial construction, design, and remodeling in Miami. Transforming visions into architectural realities with quality and commitment.' },
        { name: 'keywords', content: 'Miami construction, residential design, commercial construction, remodeling, Graco Construction, turnkey projects, Miami architecture, general contractor' },
        { name: 'author', content: 'Graco Construction Group' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#FF9F0A' },
        // Open Graph (Facebook, LinkedIn)
        { property: 'og:title', content: 'Graco Construction Group - Construction & Design in Miami' },
        { property: 'og:description', content: 'Experts in residential and commercial construction, design, and remodeling in Miami. Transform your vision into reality.' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:url', content: 'https://www.gracoconstruction.com' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Graco Construction Group' },
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Graco Construction Group - Construction & Design in Miami' },
        { name: 'twitter:description', content: 'Experts in residential and commercial construction, design, and remodeling in Miami.' },
        { name: 'twitter:image', content: '/og-image.jpg' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800;900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})