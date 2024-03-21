/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        'Inter': ['Inter', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif'],
      },
      colors:{
        'primary': '#12EB90',
        'purple': '#7C3AED',
        'background': '#F8FAFA',
        'darkGray': '#212121',
        'gray': '424242',
        'lightGray': '#9E9E9E',
      }
    },
  },
  plugins: [],
}

