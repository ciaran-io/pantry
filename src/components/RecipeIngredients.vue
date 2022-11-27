<script setup>
  defineProps({
    extendedIngredients: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-3xl">Ingredients</h3>
    <ul class="space-y-4">
      <li
        v-for="{ name, image, measures } in extendedIngredients"
        :key="name"
        class="flex items-center gap-x-6"
      >
        <img
          class="h-12 w-12 rounded-full object-cover"
          :src="`https://spoonacular.com/cdn/ingredients_100x100/${image}`"
          alt=""
          width="100"
          height="100"
        />
        <div class="grow">{{ name }}</div>
        <div>{{ Math.round(measures.metric.amount) }}g</div>
      </li>
    </ul>
  </div>
</template>
