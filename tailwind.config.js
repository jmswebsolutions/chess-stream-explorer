/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          900: 'var(--bg-primary)',
          800: 'var(--bg-secondary)',
          700: 'var(--bg-tertiary)',
          600: 'var(--border-color)',
          400: 'var(--text-secondary)',
          300: 'var(--text-secondary)',
        },
        white: 'var(--text-primary)',
      },
    },
  },
  plugins: [],
}
