/**
 * Turns an array of items into a string separated by dashes.
 * @param  {array} array - A flat array.
 * @return {string} - A string in the format of '...array[0]-array[1]-array[2]-'
 */
export const stringifier = array => array.map(color => `${color}-`).join('')

/**
 * Separates dashes from a string; reverses stringifier
 * @param  {string} string - A string containing dashes; e.g. '...string-string-string-'.
 * @return {array} - An array containing items that were separated by dashes.
 */
export const arrayifier = string => string.match(/[^-]+/g)

export const q = {
  /**
   * Stringifies an object into a query string.
   * @param  {Object} obj - The object to stringify.
   * @return {String} - The query string.
   */
  stringify: obj => {
    if (!obj) return ''

    return (
      Object.keys(obj).sort().map(key => {
        const value = obj[key]
        if (typeof value === 'undefined') return ''
        if (value === null) return key

        return `${key}=${value}`
      })
        .filter(n => !!n)
        .join('&') : ''
    )
  },
}
