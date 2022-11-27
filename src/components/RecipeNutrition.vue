<script setup>
  defineProps({
    recipeCoreNutrients: {
      type: Array ,
      required: true,
    },
  })
</script>

<template>
  <p>Nutrition per serving</p>
  <ul class="grid grid-flow-col">
    <li
      v-for="{ name, amount } in recipeCoreNutrients"
      :key="name"
      class="grid"
    >
      <span v-if="name === 'Carbohydrates'">{{ name.substring(0, 4) }}s</span>
      <span v-else>{{ name }}</span>

      <span v-if="name !== 'Calories'">{{ amount }}g</span>
      <span v-else>{{ amount }}Kcal</span>
    </li>
  </ul>
</template>
