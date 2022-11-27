export const userFavorites = () =>
  useState<Array>('favorites', () => new Set([]))
