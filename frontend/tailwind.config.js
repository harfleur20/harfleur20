/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A148C', // Violet sombre
          light: '#7B1FA2',
          dark: '#311B92',
        },
        secondary: {
          DEFAULT: '#FFD700', // Doré
          light: '#FFF176',
          dark: '#FFB300',
        },
        neutral: {
          light: '#F5F5F5', // Blanc cassé
          DEFAULT: '#9E9E9E', // Gris
          dark: '#212121', // Noir
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.5s ease-in',
        'bounce-light': 'bounceLight 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
