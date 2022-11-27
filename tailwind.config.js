/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '0.5rem',
          sm: '1rem',
          lg: '2rem',
        },
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      }
    },
  },
}
