<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    activeMenu: {
      type: Number,
      required: true,
    },
  })
  defineEmits(['changeMenu'])
  const recipeNavMenu = new Set([
    'Ingredients',
    'Instructions',
    'Nutritional Information',
  ])
</script>

<template>
  <div class="space-y-4 md:hidden">
    <h1 class="text-4xl">{{ title }}</h1>
    <ul class="flex justify-between gap-x-4 overflow-y-auto pb-4">
      <li
        v-for="(list, index) in recipeNavMenu"
        :key="list"
        class="min-w-max rounded-full border-2 px-3 py-0.5 transition-colors duration-200 cursor-pointer  "
        :class="[
          { 'border-teal-500 ': activeMenu === index },
          { 'border-transparent': activeMenu !== index },
        ]"
        @click="$emit('changeMenu', index)"
      >
        {{ list }}
      </li>
    </ul>
  </div>
</template>
