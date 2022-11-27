<script setup>
  const favorites = userFavorites()
  const route = useRoute()
  const navLinks = [
    {
      label: 'Home',
      url: '',
    },
    {
      label: 'About',
      url: 'about',
    },
    {
      label: 'Favorites',
      url: 'favorites',
    },
  ]
  const isMobileMenuClosed = ref(true)
  const mobileSize = 640

  // Close mobile menu onn screen sizes
  // greater than mobileSize
  onMounted(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > mobileSize) {
        isMobileMenuClosed.value = false
      }
    })
  })

  watch(
    () => route.path,
    () => (isMobileMenuClosed.value = false)
  )
  onMounted(() => (isMobileMenuClosed.value = false))
</script>

<template>
  <div>
    <header class="container mx-auto mt-6 space-y-12 md:mt-12">
      <nav class="relative flex items-center justify-between">
        <nuxt-link to="/">Pantry</nuxt-link>

        <!-- Mobile menu button -->
        <button
          class="sm:hidden"
          @click="isMobileMenuClosed = !isMobileMenuClosed"
        >
          <Icon
            class="h-8 w-8"
            name="ic:baseline-menu"
          />
        </button>

        <!-- Main navigation -->
        <ul
          :class="{ hidden: !isMobileMenuClosed }"
          class="absolute top-8 left-0 z-50 w-full space-y-4 bg-slate-200 p-4 sm:relative sm:top-0 sm:flex sm:w-auto sm:gap-x-6 sm:space-y-0 sm:bg-inherit sm:p-0"
        >
          <li
            v-for="link in navLinks"
            :key="link.label"
          >
            <nuxt-link
              class="relative block w-full"
              :to="`/${link.url}`"
            >
              {{ link.label }}
              <span
                v-if="link.label === 'Favorites'"
                class="rounded-full bg-[#939e52] py-1 px-2 text-xs text-white md:absolute md:-right-3 md:-top-5"
              >
                {{ favorites.size }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
    <slot />
    <LazyTheFooter />
  </div>
</template>
