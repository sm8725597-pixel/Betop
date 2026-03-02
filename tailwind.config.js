/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        winter: {
          900: '#0B192C',
          800: '#1A365D',
          700: '#2A4365',
          500: '#3182CE',
          400: '#63B3ED',
        },
        vodafone: '#E60000',
        etisalat: '#00A859'
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
