export default{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores principales basados en las variables CSS originales
        primary: {
          DEFAULT: '#FF9F0A',
          dark: '#D87A00',
          light: '#FFB340',
        },
        secondary: '#0A84FF',
        accent: '#30D158',
        
        // Sistema de grises
        gray: {
          1: '#8E8E93',
          2: '#636366',
          3: '#48484A',
          4: '#3A3A3C',
          5: '#2C2C2E',
          6: '#1C1C1E',
        },
        
        // Fondos
        background: {
          primary: '#000000',
          secondary: '#1C1C1E',
          tertiary: '#2C2C2E',
        },
        
        // Textos
        text: {
          primary: '#FFFFFF',
          secondary: '#EBEBF5',
          tertiary: '#8E8E93',
        },
        
        // Redes sociales
        facebook: '#1877F2',
        whatsapp: '#25D366',
        linkedin: '#0077B5',
      },
      
      // Gradientes
      backgroundImage: {
        'instagram': 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
        'primary-gradient': 'linear-gradient(135deg, #FF9F0A, #D87A00)',
        'secondary-gradient': 'linear-gradient(135deg, #0A84FF, #0066CC)',
        'surface-blur': 'rgba(28, 28, 30, 0.95)',
      },
      
      // Sombras (basadas en las variables CSS)
      boxShadow: {
        'sm': '0 2px 20px rgba(0, 0, 0, 0.4)',
        'md': '0 8px 40px rgba(0, 0, 0, 0.5)',
        'lg': '0 16px 60px rgba(0, 0, 0, 0.6)',
        'xl': '0 24px 80px rgba(0, 0, 0, 0.7)',
        '3d': '0 20px 50px rgba(0, 0, 0, 0.8), 0 5px 15px rgba(0, 0, 0, 0.5)',
        'button-primary': '0 6px 0 0 #D87A00, 0 12px 20px rgba(255, 159, 10, 0.3)',
        'button-secondary': '0 6px 0 0 #0066CC, 0 12px 20px rgba(10, 132, 255, 0.2)',
        'card-3d': '0 4px 0 0 rgba(255, 159, 10, 0.15), 0 8px 25px rgba(0, 0, 0, 0.4)',
        'card-3d-hover': '0 8px 0 0 rgba(255, 159, 10, 0.25), 0 16px 40px rgba(0, 0, 0, 0.5)',
      },
      
      // Border Radius (basados en las variables CSS)
      borderRadius: {
        'sm': '12px',
        'md': '18px',
        'lg': '24px',
        'xl': '30px',
        'full': '9999px',
      },
      
      // Espaciado (basado en las variables CSS)
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      
      // Transiciones
      transitionDuration: {
        'fast': '250ms',
        'base': '350ms',
        'slow': '500ms',
      },
      
      // Timing functions
      transitionTimingFunction: {
        'cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Fuentes
      fontFamily: {
        'sans':['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'montserrat': ['Montserrat',],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'manrope': ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      
      // Tamaños de fuente personalizados
      fontSize: {
        'hero-title': '9rem',
        'hero-description': '2.2rem',
        'section-title': '4rem',
        'section-subtitle': '1.5rem',
      },
      
      // Animaciones
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'fadeInUp': 'fadeInUp 1000ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slideInLeft': 'slideInLeft 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slideInRight': 'slideInRight 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scaleIn': 'scaleIn 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse': 'pulse 2s infinite',
        'scrollFilm1': 'scrollFilm1 60s linear infinite',
        'scrollFilm2': 'scrollFilm2 70s linear infinite',
        'scrollFilm3': 'scrollFilm3 80s linear infinite',
        'craneSwing': 'craneSwing 4s ease-in-out infinite',
        'craneArmSwing': 'craneArmSwing 4s ease-in-out infinite',
        'hookSwing': 'hookSwing 3s ease-in-out infinite',
        'buildingGrow': 'buildingGrow 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      
      // Keyframes
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-80px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(80px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scrollFilm1: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(280px * -8 - 24px * 8))' },
        },
        scrollFilm2: {
          '0%': { transform: 'translateX(calc(280px * -8 - 24px * 8))' },
          '100%': { transform: 'translateX(0)' },
        },
        scrollFilm3: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(280px * -8 - 24px * 8))' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        craneSwing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
        },
        craneArmSwing: {
          '0%, 100%': { transform: 'translateX(-50%) rotate(0deg)' },
          '25%': { transform: 'translateX(-50%) rotate(2deg)' },
          '75%': { transform: 'translateX(-50%) rotate(-2deg)' },
        },
        hookSwing: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(8px)' },
          '75%': { transform: 'translateX(-8px)' },
        },
        buildingGrow: {
          '0%': { opacity: '0', transform: 'scaleY(0.8) translateY(40px)' },
          '100%': { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}