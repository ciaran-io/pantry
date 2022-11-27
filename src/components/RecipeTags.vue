<script setup>
  defineProps({
    recipeTags: {
      type: Array,
      required: true,
    },
  })
  const tagList = new Set(['vegan', 'vegetarian'])
</script>

<template>
  <!-- Recipe tags -->
  <ul class="space-x-2">
    <template
      v-for="(tag, index) in recipeTags"
      :key="tag"
    >
    <!-- Display tags from tag list if recipe tag returns true from API -->
      <li
        v-if="tag"
        class="inline-block rounded-full border px-2 py-1 text-xs font-medium capitalize leading-4"
        :class="{
          'bg-green-100 text-green-800': [...tagList][index] === 'vegan',
          'bg-yellow-100 text-yellow-800': [...tagList][index] === 'vegetarian',
        }"
      >
        {{ [...tagList][index] }}
      </li>
    </template>
  </ul>
</template>
