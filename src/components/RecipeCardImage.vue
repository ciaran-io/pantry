<script setup>
  defineProps({
    src: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  })
</script>

<template>
  <img
    class="h-44 w-full rounded-xl object-cover object-center sm:h-auto sm:w-auto"
    :src="src"
    alt="image of recipe"
    :width="width"
    :height="height"
  />
</template>
