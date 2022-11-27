  /**
   * Return cooking time in format (h m).
   * Example: 1h 30m
   * @constructor
   * @param {number} time - cookingTime received from API
   */
  export function cookingTime(time) {
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