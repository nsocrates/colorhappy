// http://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript

/**
 * 1. Start with no timeout.
 * 2. Each time the function is called, restart timer.
 * 3. Once timer runs out, allow function execution
 */

export default function debounce(fn, wait, immediate) {
  // Timeout is a private variable; the returned function will
  // be able to reference this due to closure.
  let timeout

  return function (...args) {
    // Should fn be called now?
    const callNow = immediate && !timeout

    // Restart timer every time 'fn' is called
    clearTimeout(timeout)

    // Start timer
    timeout = setTimeout(() => {
      timeout = null

      if (!immediate) {
        // Call fn with apply
        // Reference 'fn' in the context of this so that 'fn' and
        // its arguments will have access to our timeout function
        fn.apply(this, args)
      }
    }, wait)

    // Execute function if in immediate mode and no wait timer
    if (callNow) fn.apply(this, args)
  }
}
