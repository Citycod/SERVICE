/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'rgb(var(--primary-blue) / <alpha-value>)',
        'primary-dark': 'rgb(var(--dark-blue) / <alpha-value>)',
        'primary-green': 'rgb(var(--green) / <alpha-value>)',
        'neutral-lightGray': 'rgb(var(--light-gray) / <alpha-value>)',
        'neutral-borderGray': 'rgb(var(--border-gray) / <alpha-value>)',
        'neutral-textGray': 'rgb(var(--text-gray) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'soft': 'var(--shadow-soft)',
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}