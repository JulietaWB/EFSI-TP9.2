/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: 'rgba(17, 24, 39, 0.7)',
        primary: '#9b8cff',
        accent: '#8ab4ff',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
