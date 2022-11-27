<script setup>
  defineEmits(['changeEndpoint'])
  defineProps({
    foodCategories: {
      type: Array,
      required: true,
    },
    foodCategory: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <ul
    class="grid grid-flow-col gap-x-4 overflow-y-scroll rounded-md bg-white p-4 text-teal-800 shadow sm:grid-flow-dense sm:grid-cols-2 sm:gap-y-3 md:h-max lg:grid-cols-1"
  >
    <li
      v-for="{ label, icon, endpoint } in foodCategories"
      :key="label"
      :class="{ 'border-2 border-teal-400': endpoint === foodCategory }"
      class="min-w-max rounded-xl border hover:border-teal-200"
    >
      <button
        class="flex h-full w-full items-center gap-x-3 py-1 px-2"
        @click="$emit('changeEndpoint', endpoint, label)"
      >
        <Icon
          class="h-8 w-8 rounded-full border border-teal-600 bg-white p-1.5 text-neutral-600"
          :name="icon"
        />
        <span class="inline-block text-sm font-medium capitalize">
          {{ label.replaceAll('-', ' ') }}</span
        >
      </button>
    </li>
  </ul>
</template>
