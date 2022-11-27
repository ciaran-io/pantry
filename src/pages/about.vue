<script setup>
  definePageMeta({
    layout: 'recipe',
  })
</script>

<template>
  <main class="container mt-12">
    <div class="space-y-8">
      <nuxt-img
        class="rounded-lg object-cover"
        format="webp"
        quality="90"
        width="1200"
        height="400"
        src="/assets/images/about-us.jpg"
        alt="picture of recipe book and healthy foods on counter top"
      />
      <h1 class="text-center text-4xl">About us</h1>
      <p>
        Welcome to our site. We are a small business sharing great recipes
        online to all our audience. We regularly update or site with new foods
        monthly so make sure to check out our social media to stay up to date
        with new recipes and more!
      </p>
    </div>
  </main>
</template>
