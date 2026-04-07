/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'magic-black': '#000000',
        'magic-dark': '#000000',
        'off-white': '#F9F7F2',
        'magic-orange': '#FF4D00',
        'magic-blue': '#0038FF',
        'magic-pink': '#FFB7D5',
      },
      fontFamily: {
        archivo: ['Archivo Black', 'sans-serif'],
        editorial: ['Instrument Serif', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out both',
      },
      aspectRatio: {
        '3/2': '3 / 2',
      }
    }
  },
  plugins: [],
}
