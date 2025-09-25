// Tailwind configuration with Khuta 2025 palette and dark mode
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        khuta: {
          // لوحة ثابتة وفق الصورة: أزرق داكن، فيروزي، ذهبي، خلفية فاتحة، نص داكن
          primary: { DEFAULT: '#0A2E5B' },
          secondary: { DEFAULT: '#008080' },
          accent: { DEFAULT: '#FFD200' },
          background: { DEFAULT: '#F5F7FA' },
          text: { DEFAULT: '#1A1A1A' },
          // درجات محايدة أساسية للحدود والأسطح
          neutral: {
            50: '#FFFFFF',
            100: '#F5F7FA',
            200: '#E8ECF2',
            300: '#DDE3EA',
            400: '#C9D1DB',
            500: '#AEB7C3',
            600: '#8E98A6',
            700: '#6C7684',
            800: '#3C434D',
            900: '#1A1A1A'
          },
          success: '#2E7D6D',
          warning: '#D69E2E',
          error:   '#C2414B',
          info:    '#6FA0C8'
        },
      },
      fontFamily: {
        sans: ['Cairo','Tajawal','Poppins','ui-sans-serif','system-ui','-apple-system','"Segoe UI"','Roboto','"Helvetica Neue"','Arial']
      },
      boxShadow: {
        'kh-card': '0 8px 24px rgba(32,64,120,0.08)',
        'kh-card-lg': '0 14px 34px rgba(32,64,120,0.12)'
      },
      borderRadius: {
        'kh': '1rem'
      }
    },
  },
  plugins: [],
};