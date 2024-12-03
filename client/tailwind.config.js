/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'logo-white': "#fcfcfc",
        'logo-blue' : "#3c5185",
        'logo-blue-gray' : "#5d6e94",
        'logo-gray-blue' : "#7e8ba4",
        'logo-gray' : "#9fa9b4",
      },
      fontFamily : {
        'poppins' : ['Poppins', 'san-serif'],
        'nunito-sans' : ['Nunito Sans', 'san-serif'],
      }
    },
  },
  plugins: [],
}