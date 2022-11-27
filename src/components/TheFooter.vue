<script lang="ts" setup>
  const socialLinks = {
    facebook: 'logos:facebook',
    twitter: 'logos:twitter',
    instagram: 'bxl:instagram-alt',
    pinterest: 'logos:pinterest',
  }
  const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="container mt-32 border-t">
    <div class="grid h-64 place-items-center">
      <div class="flex gap-x-4">
        <nuxt-link
          v-for="(value, key) in socialLinks"
          :key="key"
          :to="`https://${key}.com`"
        >
          <Icon
            class="h-8 w-8"
            :name="value"
          />
        </nuxt-link>
      </div>
      <div>©{{ currentYear }} Pantry</div>
    </div>
  </footer>
</template>
