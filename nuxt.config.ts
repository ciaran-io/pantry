// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  typescript: { shim: false },

  runtimeConfig: {
    apiSpoonKey: process.env.SPOONACULAR_API_KEY,
    public: {
      apiURL: 'https://api.spoonacular.com/recipes',
    },
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
  app: {
    head: {
      titleTemplate: 'Pantry | All your recipes in one place',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'author', content: 'Ciaran Toner' },
        { name: 'keywords', content: 'food recipes, recipes' },
        { name: 'description', content: 'A curated list of fantastic recipes' },
      ],
    },
  },
})
