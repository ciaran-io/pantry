<script setup>
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

  const favorites = userFavorites()
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
  <div class="md:container md:mx-auto md:grid md:grid-flow-col">
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
      <!-- Banner -->
      <div>
        <section
          class="space-y-12 md:grid md:min-h-[500px] md:grid-cols-[2fr,1fr] md:space-y-0"
        >
          <!-- Banner text -->
          <div class="pr-8">
            <h1
              class="text-3xl font-bold !leading-[1.2] md:max-w-[16ch] md:text-5xl"
            >
              Welcome to your <span class="text-[#939e52]">Pantry</span>, find
              all your favorite <span class="text-[#939e52]">meals</span> &
              <span class="text-[#939e52]">recipes</span>
            </h1>
          </div>

          <!-- Banner image -->
          <div
            class="relative h-64 w-3/4 rounded-tr-3xl rounded-br-3xl bg-[#d3dea1] max-md:mx-auto md:h-full md:w-full"
          >
            <div
              class="plate absolute -left-12 w-11/12 md:-left-20 md:top-1/4 md:bottom-10 md:h-3/4 md:w-full"
            >
              <nuxt-img
                src="/assets/images/subject.png"
                alt="image of a plate with salad"
                class="relative rounded-full border-8 border-white p-2 md:w-full"
                height="225"
                width="200"
              />
            </div>
          </div>
        </section>
      </div>
    </header>
    <!-- Aside image -->
    <div class="hidden lg:mt-14 lg:block lg:w-80">
      <nuxt-img
        quality="90"
        format="webp"
        class="h-[565px] w-auto rounded-tr-3xl rounded-br-3xl object-cover"
        src="/assets/images/ingredients.jpg"
        alt="image of ingredients, avocado, salt and toast"
        height="1000"
        width="405"
      />
    </div>
  </div>
</template>
