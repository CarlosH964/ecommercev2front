/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'mh' : '1300px',
        'xl' : '1800px'
      }
    },
  },
  plugins: [],
}

