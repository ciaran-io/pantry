<script setup>
  definePageMeta({
    layout: 'recipe',
  })
  // User favorites
  const favorites = userFavorites()

  const {
    error,
    pending,
    data: userRecipes,
  } = useLazyAsyncData('userRecipes', () =>
    $fetch('/api/recipesById', {
      query: { recipesById: [...favorites.value] },
    })
  )
</script>

<template>
  <main class="container mt-16">
    <!-- Show if now favorites -->
    <div
      v-if="favorites.size < 1"
      class="space-y-6"
    >
      <nuxt-img
        format="webp"
        quality="90"
        height="400"
        width="1200"
        src="/assets/images/user-recipe.jpg"
        class="mx-auto rounded-lg object-cover"
      />
      <h1 class="text-center text-3xl">No favorites yet</h1>
    </div>

    <!-- Load placeholder card on error / pending -->
    <template v-else-if="error || pending">
      <div>
        <RecipeCardAnimation class="min-h-[235px]" />
      </div>
    </template>

    <div
      v-else
      class="space-y-12"
    >
      <nuxt-img
        format="webp"
        quality="90"
        height="400"
        width="1200"
        src="/assets/images/user-recipe.jpg"
        class="mx-auto rounded-lg object-cover"
      />

      <h1 class="text-center text-4xl">Your saved recipes</h1>
      <div class="grid gap-x-4 gap-y-8 md:grid-cols-2">
        <template v-if="userRecipes.length > 1">
          <div
            v-for="{
              title,
              image,
              readyInMinutes,
              servings,
              id,
            } in userRecipes"
            :key="id"
          >
            <div class="gap-x-4 space-y-4 rounded-md p-4 shadow-md md:flex">
              <RecipeCardImage
                class="!w-full sm:!h-32 sm:!w-32"
                :src="image"
                :width="96"
                :height="96"
              />
              <div>
                <h2>{{ title }}</h2>
                <!-- Cooking time imported from utils -->
                <RecipeCardCookingDetails
                  :cooking-time="cookingTime(readyInMinutes)"
                  :servings="servings"
                />
                <nuxt-link
                  class="text-[#939e52] hover:underline"
                  :to="{
                    path: '/recipe',
                    query: { id: id },
                  }"
                >
                  View recipe
                </nuxt-link>
              </div>
            </div>
          </div>
        </template>

        <div
          v-else
          class="gap-x-4 space-y-4 rounded-md p-4 shadow-md md:flex"
        >
          <RecipeCardImage
            class="!w-full sm:!h-32 sm:!w-32"
            :src="userRecipes.image"
            :width="96"
            :height="96"
          />
          <div>
            <h2>{{ userRecipes.title }}</h2>
            <!-- Cooking time imported from utils -->
            <RecipeCardCookingDetails
              :cooking-time="cookingTime(userRecipes.readyInMinutes)"
              :servings="userRecipes.servings"
            />
            <nuxt-link
              class="text-[#939e52] hover:underline"
              :to="{
                path: '/recipe',
                query: { id: userRecipes.id },
              }"
            >
              View recipe
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
