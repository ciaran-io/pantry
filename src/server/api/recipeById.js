export default defineEventHandler(async (event) => {
  const { recipeId } = getQuery(event)

  const config = useRuntimeConfig()
  const apiKey = config.apiSpoonKey
  const apiUrl = config.public.apiURL
  const fetchUrl = `${apiUrl}/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`

  const result = await $fetch(fetchUrl)
  return result

})
