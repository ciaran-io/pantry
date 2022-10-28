<script setup>
  const navLinks = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'About',
      url: 'about',
    },
    {
      label: 'Favourites',
      url: 'favourites',
    },
  ]
</script>

<template>
  <div class="md:container md:mx-auto md:grid md:grid-flow-col">
    <header class="container mx-auto mt-2 space-y-12 md:mt-12">
      <nav class="flex items-center justify-between">
        <nuxt-link to="/">Pantry</nuxt-link>
        
        <!-- Mobile menu button -->
        <button class="sm:hidden">
          <Icon
            class="h-8 w-8"
            name="ic:baseline-menu"
          />
        </button>

        <!-- Main navigation -->
        <ul class="hidden sm:flex sm:gap-x-6">
          <li
            v-for="links in navLinks"
            :key="links.label"
            :to="`/${links.url}`"
          >
            <nuxt-link>
              {{ links.label }}
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
              all your favourite <span class="text-[#939e52]">meals</span> &
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
              <img
                src="/assets/images/subject.png"
                alt=""
                class="relative md:w-full rounded-full border-8 border-white p-2"
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
      <img
        class="h-[565px] w-auto rounded-tr-3xl rounded-br-3xl object-cover"
        src="/assets/images/ingredients.jpg"
        alt=""
        height="1000"
        width="405"
      />
    </div>
  </div>
</template>
