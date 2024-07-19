/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'mh' : '1300px',
        'xl' : '2500px',
        'minxl' : '1800px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

