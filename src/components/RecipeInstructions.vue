<script setup>
  defineProps({
    recipe: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <div class="space-y-6">
    <!-- Recipe instruction -->
    <h2 class="text-3xl">Instructions</h2>
    <!-- Recipe instructions -->
    <ol class="space-y-6">
      <li
        v-for="({ step }, index) in recipe.analyzedInstructions[0].steps"
        :key="index"
        class="grid grid-cols-[min-content_1fr] items-center gap-x-3"
      >
        <div class="grid h-8 w-8 place-items-center rounded-full bg-slate-700">
          <span class="block font-semibold text-white">
            {{ index + 1 }}
          </span>
        </div>
        <span>{{ step }}</span>
      </li>
    </ol>
  </div>
</template>
