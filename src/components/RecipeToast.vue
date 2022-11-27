<script setup>
  defineProps({
    recipeAdded: {
      type: Boolean,
      required: true,
    },
  })
</script>

<template>
  <div
    class="fixed top-5 left-0 right-0 mx-auto flex h-12 w-max items-center justify-center space-x-2 rounded-lg bg-[#d3dea1] px-20 text-sm shadow-lg"
  >
    <Icon
      class="h-5 w-5"
      name="material-symbols:check-circle-rounded"
    />

    <span>
      {{
        recipeAdded
          ? ' Recipe added to favorites'
          : ' Recipe removed from favorites'
      }}
    </span>
  </div>
</template>
