import { fileURLToPath } from 'url'
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  typescript: { shim: false },

  runtimeConfig: {
    apiSpoonKey: process.env.SPOONACULAR_API_KEY
  },

  // Src directory
  srcDir: 'src/',

  // Nuxt modules
  modules: ['nuxt-icon', '@nuxtjs/tailwindcss', '@nuxt/image-edge'],

  // Tailwind module config
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    config: '~~/tailwind.config.js',
    exposeConfig: false,
    viewer: false,
  },

  // Directory aliases
  alias: {
    'images': fileURLToPath(new URL('/assets/images', import.meta.url))
  }

})
