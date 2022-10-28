<script lang="ts" setup>
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
      label: 'Favourites',
      url: 'favourites',
    },
  ]
</script>


<template>
  <div>
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
    </header>
    <slot />
    <LazyTheFooter/>
  </div>
</template>
