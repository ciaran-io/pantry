<script setup>
// Template for cooking time & servings
  defineProps({
    cookingTime: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
  })
</script>

<template>
  <div class="mt-auto flex justify-between text-sm">
    <!-- Cooking time -->
    <div>
      <span class="block text-gray-500">Cook Time</span>
      <span class="block font-bold">
        {{ cookingTime }}
      </span>
    </div>
      <!-- Cooking servings -->
    <div>
      <span class="block text-gray-500">Serving</span>
      <span class="block font-bold">
        <Icon name="fluent:people-48-filled" />
        {{ servings }}
      </span>
    </div>

  </div>
</template>
