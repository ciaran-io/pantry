/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true
  },
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '0.5rem',
          sm: '1rem',
          lg: '2rem',
        },
      },
    },
  },
}
