const config = useRuntimeConfig()
const apiKey = config.apiSpoonKey
const apiUrl = config.public.apiURL

export default defineEventHandler(async (event) => {
  const { recipesById } = getQuery(event)

  if (Array.isArray(recipesById)) {
    let urls = recipesById.map((id) => {
      return `${apiUrl}/${id}/information?includeNutrition=false&apiKey=${apiKey}`
    })

    return await Promise.all(
      urls.map(async (url) => {
        const result = await $fetch(url)
        return result
      })
    )
  } else {
    const fetchUrl = `${apiUrl}/${recipesById}/information?includeNutrition=true&apiKey=${apiKey}`

    const result = await $fetch(fetchUrl)
    return result
  }
})
