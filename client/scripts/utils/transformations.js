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
