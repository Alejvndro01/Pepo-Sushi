/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeo exacto de las variables CSS del prototipo
        brand: {
          cream: '#fbf9f6',
          indigo: '#234386',
          honey: '#ffc400',
          orange: '#ed7328',
          mint: '#a2d3a6',
          ink: '#000000'
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        nav: ['Jost', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      animation: {
        'float-slow': 'floatSlow 12s ease-in-out infinite',
        'float-slow-2': 'floatSlow2 14s ease-in-out infinite',
      },
      keyframes: {
        // Optimizado para GPU con transformaciones compuestas
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(20px, -30px) rotate(5deg)' },
        },
        floatSlow2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-25px, 20px) rotate(-5deg)' },
        }
      },
      boxShadow: {
        'card': '-14px 10px 49px 0px rgba(0, 0, 0, 0.16)',
      }
    },
  },
  plugins: [],
}