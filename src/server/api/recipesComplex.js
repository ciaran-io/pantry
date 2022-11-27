const config = useRuntimeConfig()
const apiKey = config.apiSpoonKey
const apiUrl = config.public.apiURL

export default defineEventHandler(async (event) => {
  const { foodQuery } = getQuery(event)
  const fetchUrl = `${apiUrl}/complexSearch?cuisine=european&type=${foodQuery}&addRecipeInformation=true&number=4&apiKey=${apiKey}`
  const result = await $fetch(fetchUrl)
  
  return result

})
