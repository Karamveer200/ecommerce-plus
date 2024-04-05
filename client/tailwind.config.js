/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    minWidth: {
      '1/2': '50%'
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'Montserrat']
      }
    }
  },
  plugins: []
};
