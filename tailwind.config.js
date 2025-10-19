/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a',
        professional: '#3b82f6',
        ofw: '#a855f7',
        recovery: '#f97316',
        entrylevel: '#6366f1',
      },
    },
  },
  plugins: [],
}