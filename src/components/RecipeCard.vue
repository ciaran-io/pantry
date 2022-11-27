<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    recipeSummary: {
      type: String,
      required: false,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    imageWidth: {
      type: Number,
      required: true,
    },
    imageHeight: {
      type: Number,
      required: true,
    },
    readyInMinutes: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    userFavorites: {
      type: Boolean,
      required: true,
    },
  })

  defineEmits(['updateFavorites'])
  // shorten the recipe summary if it's too long
  function truncateString(string) {
    if (!string) return 'No summary available'
    return string.length > 130 ? string.substring(0, 130) + '...' : string
  }
</script>

<template>
  <div class="h-max rounded-xl bg-white p-3 shadow-xl sm:gap-x-4 relative">
    <!-- Recipe card image -->
    <RecipeCardImage
      :src="image"
      :height="imageHeight"
      :width="imageWidth"
    />

    <div class="space-y-4">
      <h2 class="font-medium sm:text-sm">{{ title }}</h2>
      <!-- Recipe card cooking time / servings -->
      <!-- Cooking time imported from utils -->
      <RecipeCardCookingDetails
        :cooking-time="cookingTime(readyInMinutes)"
        :servings="servings"
      />
      <!-- Recipe card summary -->
      <p
        v-if="recipeSummary"
        class="font-semibold"
        v-html="truncateString(recipeSummary)"
      ></p>
      <!-- Recipe card link  -->
      <nuxt-link
        class="btn block"
        :to="{
          path: '/recipe',
          query: { id: id },
        }"
      >
        View recipe
      </nuxt-link>

      <!-- Add to favorite button -->
      <RecipeFavoritesButton
        :id="id"
        :user-favorites="userFavorites"
        @click="$emit('updateFavorites', id)"
      />
    </div>

    <!-- Recipe card loading placeholder -->
    <div
      aria-hidden="true"
      :class="{
        'visible  ': isLoading,
        'invisible  ': !isLoading,
      }"
      class="absolute inset-0 w-full rounded-xl bg-white/30 backdrop-blur-sm"
    >
      <div class="relative grid h-full place-items-center rounded-xl">
        <Icon
          :class="{
            'animate-spin': isLoading,
          }"
          class="h-12 w-12 text-teal-600"
          name="ep:loading"
        />
      </div>
    </div>
  </div>
</template>
