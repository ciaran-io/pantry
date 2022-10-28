<script setup>
  const config = useRuntimeConfig()
  const apiKey = config.apiSpoonKey

  const url =
    'https://api.spoonacular.com/recipes/complexSearch?cuisine=european&type='
  const recipesToReturn = 4

  const vegetarianEndpoint = `main%20course&diet=Vegetarian&addRecipeInformation=true&number=${recipesToReturn}`
  const dessertEndpoint = `dessert&addRecipeInformation=true&number=${recipesToReturn}`
  const glutenFreeEndpoint = `main%20course&diet=Gluten%20Free&addRecipeInformation=true&number=${recipesToReturn}`
  const paleoEndpoint = `main%20course&diet=Paleo&addRecipeInformation=true&number=${recipesToReturn}`
  const lowCarbsEndpoint = `main%20course&addRecipeInformation=true&number=${recipesToReturn}&maxCarbs=10`
  const trendingEndpoint = `main%20course&diet=Whole30&addRecipeInformation=true&number=${recipesToReturn}`
  const randomEndpoint = `main%20course|snack|appetizer&addRecipeInformation=true&number=${recipesToReturn}&sort=random`

  const recipeUrl = ref(dessertEndpoint)

  const {
    data: recipes,
    pending,
    error,
  } = await useLazyFetch(`${url}${recipeUrl.value}&apiKey=${apiKey}`)

  const foodCategories = [
    {
      label: 'vegetarian',
      icon: 'fluent:bowl-salad-20-filled',
      url: `${vegetarianEndpoint}`,
    },
    {
      label: 'gluten free',
      icon: 'fa6-solid:wheat-awn',
      url: `${glutenFreeEndpoint}`,
    },
    {
      label: 'paleo',
      icon: 'game-icons:caveman',
      url: `${paleoEndpoint}`,
    },
    {
      label: 'low carb',
      icon: 'emojione-monotone:croissant',
      url: `${lowCarbsEndpoint}`,
    },
    {
      label: 'desserts',
      icon: 'file-icons:cakefile',
      url: `${dessertEndpoint}`,
    },
    {
      label: 'trending',
      icon: 'ant-design:fire-filled',
      url: `${trendingEndpoint}`,
    },
    {
      label: 'random',
      icon: 'fa-solid:random',
      url: `${randomEndpoint}`,
    },
  ]
  // console.log(recipes.value)
  /**
   * Return cooking time in format (h m).
   * Example: 1h 30m
   * @constructor
   * @param {number} time - cookingTime received from API
   */
  function cookingTime(time) {
    if (!time) return 'No cooking time available'
    // Return hours in time
    const hours = Math.floor(time / 60)
    // Return minutes in time
    const minutes = Math.round((time / 60 - hours) * 60)

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`
    } else if (hours > 0 && minutes < 1) {
      return `${hours}h`
    } else {
      return `${minutes}m`
    }
  }

  function updateRecipeUrl(recipeValue) {
    console.log(recipeValue)
  }

  function truncateString(string) {
    if (!string) return 'No summary available'
    return string.length > 190 ? string.substring(0, 190) + '...' : string
  }

  watch(() => recipes.value)
</script>

<template>
  <div
    class="container mx-auto mt-64 space-y-8 rounded-lg bg-neutral-200 p-4 shadow"
  >
    <h2 class="text-3xl">Recipes</h2>

    <!-- Recipe container -->
    <div v-if="pending || error">Loading...</div>
    <section
      v-else
      class="grid gap-x-10 md:grid-cols-[max-content_2fr_1fr]"
    >
      <!-- Categories -->
      <div class="mr-12 overflow-x-scroll pb-4 lg:overflow-visible">
        <ul
          class="grid grid-flow-col space-x-4 rounded-md bg-neutral-200 p-4 shadow lg:block lg:w-[calc(100%_+_50px)] lg:space-x-0 lg:space-y-3"
        >
          <li
            v-for="(value, key) in foodCategories"
            :key="key"
            class="min-w-max"
          >
            <button class="flex h-full w-full items-center gap-x-3 py-1 px-2">
              <Icon
                class="h-8 w-8 rounded-full bg-white p-1.5 text-neutral-600"
                :name="value.icon"
              />
              <span class="inline-block text-sm font-medium">{{
                value.label
              }}</span>
            </button>
          </li>
        </ul>
      </div>
      <!-- Main recipe card -->
      <div class="h-fit rounded-xl bg-neutral-400 shadow-lg">
        <div class="grid grid-cols-[max-content_1fr] gap-x-6 p-4">
          <div>
            <img
              class="rounded-xl object-cover"
              :src="recipes.results[0].image"
              alt=""
              width="200"
              height="200"
            />
          </div>
          <!--  -->
          <div class="space-y-4">
            <h2 class="text-2xl font-medium text-white">
              {{ recipes.results[0].title }}
            </h2>

            <div class="space-y-4">
              <p
                class="font-semibold"
                v-html="truncateString(recipes.results[0].summary)"
              ></p>
              <nuxt-link
                class="block rounded-full border px-4 py-1 text-center"
                :to="{
                  path: '/recipe',
                  query: { id: recipes.results[0].id },
                }"
              >
                View recipe
              </nuxt-link>
            </div>

            <div class="flex justify-between text-sm">
              <!-- Cooking time -->
              <div class="">
                <span class="block text-gray-400">Cook Time</span>
                <span class="block font-bold">{{
                  cookingTime(recipes.results[0].readyInMinutes)
                }}</span>
              </div>
              <div>
                <span class="block text-gray-500">Serving</span>
                <span class="block font-bold">
                  <Icon name="fluent:people-48-filled" />
                  {{ recipes.results[0].servings }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Additional recipe card -->
      <div class="space-y-4">
        <div
          v-for="{
            title,
            image,
            readyInMinutes,
            servings,
            id,
          } in recipes.results"
          :key="title"
          class="relative grid grid-cols-[100px,1fr] gap-x-4 rounded-xl bg-neutral-500 p-3 text-white shadow-xl"
        >
          <img
            class="h-20 w-20 rounded-xl object-cover object-center"
            :src="image"
            alt=""
            width="96"
            height="96"
          />
          <div class="col-start-2 space-y-4">
            <h2 class="text-sm font-medium">{{ title }}</h2>

            <div class="flex justify-between text-sm">
              <!-- Cooking time -->
              <div class="">
                <span class="block text-gray-300">Cook Time</span>
                <span class="block">{{ cookingTime(readyInMinutes) }}</span>
              </div>

              <div>
                <span class="block text-gray-300">Serving</span>
                <span class="">
                  <Icon name="fluent:people-48-filled" /> {{ servings }}
                </span>
              </div>
            </div>
            <div>
              <nuxt-link
                class="block rounded-full border px-4 py-1 text-center text-sm"
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
      </div>
    </section>
  </div>
</template>
