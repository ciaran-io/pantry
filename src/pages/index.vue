<script setup>
  // FIXME: Check local storage before calling API

  // User favorites
  const favorites = userFavorites()
  const vegetarianEndpoint = 'main%20course&diet=vegetarian'
  const dessertEndpoint = 'dessert'
  const glutenFreeEndpoint = 'main%20course&diet=gluten%20free'
  const paleoEndpoint = 'main%20course&diet=primal'
  const lowCarbsEndpoint = 'main%20course&maxCarbs=10'
  const trendingEndpoint = 'main%20course&diet=ketogenic'
  const randomEndpoint =
    'random?number=4&tags=main%20course,Side%20Dish&offset=30'
  const foodCategories = [
    {
      label: 'vegetarian',
      icon: 'fluent:bowl-salad-20-filled',
      endpoint: vegetarianEndpoint,
    },
    {
      label: 'gluten-free',
      icon: 'fa6-solid:wheat-awn',
      endpoint: glutenFreeEndpoint,
    },
    {
      label: 'primal',
      icon: 'game-icons:caveman',
      endpoint: paleoEndpoint,
    },
    {
      label: 'low-carb',
      icon: 'emojione-monotone:croissant',
      endpoint: lowCarbsEndpoint,
    },
    {
      label: 'desserts',
      icon: 'file-icons:cakefile',
      endpoint: dessertEndpoint,
    },
    {
      label: 'trending',
      icon: 'ant-design:fire-filled',
      endpoint: trendingEndpoint,
    },
    {
      label: 'random',
      icon: 'fa-solid:random',
      endpoint: randomEndpoint,
    },
  ]
  const localStorageLabel = ref(foodCategories[0].label)
  const foodCategory = ref(foodCategories[0].endpoint)
  const isLoading = ref(false)
  const recipeCardContainer = ref(null)
  const updatingToast = ref(false)
  const recipeAdded = ref(true)

  const {
    error,
    pending,
    data: recipes,
  } = useLazyAsyncData('recipes', () =>
    $fetch('/api/recipesComplex', { query: { foodQuery: foodCategory.value } })
  )
  const refresh = () => refreshNuxtData('recipes')

  // Set sizes (width, height) for loading cards
  function setLoadingCardSizes() {
    const [...recipeCards] = [
      recipeCardContainer.value.children[1].lastElementChild,
      recipeCardContainer.value.children[2].children,
    ]

    recipeCards[0].style.width = `${recipeCards[0].offsetWidth}px`
    recipeCards[0].style.height = `${recipeCards[0].offsetHeight}px`

    for (let card of recipeCards[1]) {
      card.lastElementChild.style.width = `${card.offsetWidth}px`
      card.lastElementChild.style.height = `${card.offsetHeight}px`
    }
  }

  async function checkLocalStorage() {
    let recipe = localStorage.getItem(`recipe:${localStorageLabel.value}`)

    if (recipe) {
      recipe = JSON.parse(recipe)
      recipes.value = recipe
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    } else {
      await refresh()
      localStorage.setItem(
        `recipe:${localStorageLabel.value}`,
        JSON.stringify(recipes.value)
      )
      isLoading.value = false
    }
  }

  function changeEndpoint(endpoint, label) {
    setLoadingCardSizes()
    isLoading.value = true

    foodCategory.value = endpoint
    localStorageLabel.value = label

    checkLocalStorage()
  }

  function call(data) {
    favorites.value.has(data)
      ? (favorites.value.delete(data), (recipeAdded.value = false))
      : (favorites.value.add(data), (recipeAdded.value = true))

    updatingToast.value = true

    setTimeout(() => {
      updatingToast.value = false
    }, 2500)
  }

  const checkRecipeIsFavorite = (id) => favorites.value.has(id)
</script>

<template>
  <main class="container mt-64">
    <!-- Toast -->
    <transition name="slide-fade">
      <recipe-toast
        v-show="updatingToast"
        :recipe-added="recipeAdded"
      />
    </transition>

    <section
      class="container space-y-8 rounded-lg bg-neutral-300 p-4 shadow lg:min-h-[590px] lg:max-w-screen-xl"
    >
      <h2 class="text-3xl">Recipes</h2>
      <!-- Recipe container -->
      <div
        ref="recipeCardContainer"
        class="grid gap-y-8 gap-x-6 overflow-clip lg:md:grid-cols-[1fr_2fr_1fr]"
      >
        <!-- Categories -->
        <recipe-category-list
          :food-categories="foodCategories"
          :food-category="foodCategory"
          @change-endpoint="changeEndpoint"
        />
        <!-- Recipe placeholder card -->
        <template v-if="error || pending">
          <recipe-card-animation class="min-h-[235px]" />
        </template>
        <!-- Main recipe card -->
        <template v-else>
          <recipe-card
            :id="recipes.results[0].id"
            :title="recipes.results[0].title"
            :recipe-summary="recipes.results[0].summary"
            :ready-in-minutes="recipes.results[0].readyInMinutes"
            :servings="recipes.results[0].servings"
            :image="recipes.results[0].image"
            :image-width="235"
            :image-height="200"
            :is-loading="isLoading"
            class="sm:grid sm:grid-cols-[210px,1fr] sm:gap-y-2 lg:gap-x-8 lg:[&_h2]:text-2xl"
            :user-favorites="checkRecipeIsFavorite(recipes.results[0].id)"
            @update-favorites="call"
          />
          <!-- Additional recipe card -->
          <div class="space-y-4">
            <recipe-card
              v-for="{
                title,
                image,
                readyInMinutes,
                servings,
                id,
              } in recipes.results
                ? recipes.results.slice(1, 4)
                : recipes.results"
              :id="id"
              :key="title"
              :title="title"
              :ready-in-minutes="readyInMinutes"
              :servings="servings"
              :image="image"
              :image-width="95"
              :image-height="95"
              :is-loading="isLoading"
              class="sm:grid sm:grid-cols-[210px,1fr] sm:gap-y-2 lg:block lg:[&_h2]:text-xl"
              :user-favorites="checkRecipeIsFavorite(id)"
              @update-favorites="call"
            />
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<style>
  .slide-fade-enter-active {
    transition: all 0.3s ease-in 0.5s;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
