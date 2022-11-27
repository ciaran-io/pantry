<script setup>
  definePageMeta({
    layout: 'recipe',
  })

  const route = useRoute()
  const id = ref(route.query.id)
  const activeMenu = ref(0)
  const recipeMenuResultContainer = ref(null)
  const {
    data: recipe,
    pending,
    error,
  } = await useLazyFetch('/api/recipeById/', {
    query: { recipeId: id.value },
  })

  const recipeCoreNutrients = ref([])
  const keyNutrients = ['Calories', 'Protein', 'Carbohydrates', 'Fat']

  function getRecipeNutrients() {
    const { nutrients } = recipe.value.nutrition
    console.log(nutrients)

    recipeCoreNutrients.value = nutrients.filter((nutrients) => {
      let index = 0
      for (index; index < keyNutrients.length; index++) {
        if (nutrients.name === keyNutrients[index]) return nutrients.name
      }
    })
  }

  watch(recipe, (newRecipes, oldRecipes) => {
    if (newRecipes) {
      getRecipeNutrients()
    }
  })

  onMounted(() => {
    if (recipeMenuResultContainer.value?.children[0]) {
      const firstChildHeight =
        recipeMenuResultContainer.value.children[0].clientHeight + 'px'
      recipeMenuResultContainer.value.style.height = firstChildHeight
    }
  })
</script>

<template>
  <div class="container mt-16">
    <template v-if="error || pending">
      <RecipeCardAnimation class="min-h-[235px]" />
    </template>
    <div
      v-else
      class="grid gap-x-12 md:grid-cols-[1fr_1fr]"
    >
      <div class="container relative space-y-6 overflow-hidden">
        <!-- Recipe image -->
        <img
          class="relative rounded-xl md:rounded-tl-3xl md:rounded-bl-3xl"
          :src="recipe.image"
          alt=""
        />
        <!-- Recipe menu mobile -->
        <recipe-information-menu
          :active-menu="activeMenu"
          :title="recipe.title"
          @change-menu="(index) => (activeMenu = index)"
        />

        <div
          ref="recipeMenuResultContainer"
          class="relative min-h-[750px] [&_>_div]:absolute [&_>_div]:top-0 [&_>_div]:left-0 [&_>_div]:w-full [&_>_div]:rounded-md [&_>_div]:p-1 [&_>_div]:shadow-md md:[&_>_div]:!relative"
        >
          <!-- Recipe ingredients  -->
          <transition
            v-show="activeMenu === 0"
            name="slide-fade"
          >
            <recipe-ingredients
              :extended-ingredients="recipe.extendedIngredients"
              class="md:!p-4"
            />
          </transition>
          <!-- Recipe instructions hidden on large screens-->
          <transition
            v-show="activeMenu === 1"
            name="slide-fade"
          >
            <recipe-instructions :recipe="recipe" />
          </transition>

          <!-- Recipe nutrients hidden on large screens-->
          <transition
            v-show="activeMenu === 2"
            name="slide-fade"
          >
            <div class="space-y-4">
              <recipe-tags :recipe-tags="[recipe.vegetarian, recipe.vegan]" />
              <recipe-nutrition :recipe-core-nutrients="recipeCoreNutrients" />
            </div>
          </transition>
        </div>
      </div>
      <!-- Recipe name & instructions -->
      <div class="hidden space-y-8 rounded-xl p-4 shadow md:block">
        <h1 class="text-4xl md:block">{{ recipe.title }}</h1>
        <recipe-tags :recipe-tags="[recipe.vegetarian, recipe.vegan]" />
        <recipe-nutrition :recipe-core-nutrients="recipeCoreNutrients" />
        <recipe-instructions :recipe="recipe" />
      </div>
    </div>
  </div>
</template>

<style>
  /*
  src attribution vue js
  https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
  Enter and leave animations can use different
  durations and timing functions.
*/
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
