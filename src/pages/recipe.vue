<script setup>
  definePageMeta({
    layout: 'recipe',
  })
  const route = useRoute()
  const { id } = route.query
  const config = useRuntimeConfig()
  const apiKey = config.apiSpoonKey

  const recipeEndpoint = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`
  const {
    data: recipe,
    pending,
    error,
  } = await useLazyFetch(`${recipeEndpoint}`)

  const recipeCoreNutrients = ref()

  const keyNutrients = ['Calories', 'Protein', 'Carbohydrates', 'Fat']

  watch(
    () => recipe.value,
    () => {
      const { nutrients } = recipe.value.nutrition
      recipeCoreNutrients.value = nutrients.filter((nutrients) => {
        let index = 0
        for (index; index < keyNutrients.length; index++) {
          if (nutrients.name === keyNutrients[index]) return nutrients.name
        }
      })
    }
  )
</script>

<template>
  <div class="mt-16">
    <div v-if="pending">Loading ...</div>
    <div
      v-else
      class="container mx-auto grid grid-cols-[1fr_1fr] gap-x-12"
    >
      <div class="space-y-6 rounded-xl p-4 shadow">
        <!-- Recipe image -->
        <img
          class="rounded-tl-3xl rounded-bl-3xl"
          :src="recipe.image"
          alt=""
        />
        <!-- Recipe ingredients  -->
        <div class="space-y-6">
          <h3 class="text-3xl">Ingredients</h3>
          <ul class="space-y-4">
            <li
              v-for="{ name, image, measures } in recipe.extendedIngredients"
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
      </div>
      <!-- Recipe name & instructions -->
      <div class="space-y-6 rounded-xl p-4 shadow">
        <h1 class="text-4xl">{{ recipe.title }}</h1>
        <div class="space-y-6">
          <div>
            <div class="space-x-2">
              <span
                v-if="!recipe.vegan"
                class="rounded-full border px-4 py-1 text-sm"
                >Vegan</span
              >
              <span
                v-if="recipe.vegetarian"
                class="rounded-full border px-4 py-1 text-sm"
                >Vegetarian</span
              >
            </div>
          </div>

          <!-- Recipe nutrition -->
          <p>Nutrition per serving</p>
          <ul class="grid grid-flow-col">
            <li
              v-for="{ name, amount } in recipeCoreNutrients"
              :key="name"
              class="grid"
            >
              <span v-if="name === 'Carbohydrates'"
                >{{ name.substring(0, 4) }}s</span
              >
              <span v-else>{{ name }}</span>

              <span v-if="name !== 'Calories'">{{ amount }}g</span>
              <span v-else>{{ amount }}Kcal</span>
            </li>
          </ul>

          <h2 class="text-3xl">Instructions</h2>
          <!-- Recipe instructions -->
          <ol class="space-y-6">
            <li
              v-for="({ step }, index) in recipe.analyzedInstructions[0].steps"
              class="grid grid-cols-[min-content_1fr] items-center gap-x-3"
            >
              <div
                class="grid h-8 w-8 place-items-center rounded-full bg-slate-700"
              >
                <span class="block font-semibold text-white">
                  {{ index + 1 }}
                </span>
              </div>
              <span>{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
