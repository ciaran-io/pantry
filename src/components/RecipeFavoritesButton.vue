<script setup>
  defineProps({
    id: {
      type: Number,
      required: true,
    },
    userFavorites: {
      type: Boolean,
      required: true,
    },
  })
</script>

<template>
  <button class="btn relative w-full">
    {{ userFavorites ? 'Remove from favorites' : 'Add to favorites' }}
  </button>
</template>
