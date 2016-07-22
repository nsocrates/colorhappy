// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.

export default function throttle(fn, wait, opts = {}) {
  let context
  let args
  let result
  let timeout = null
  let previous = 0

  function later() {
    previous = opts.leading === false ? 0 : Date.now()
    timeout = null
    result = fn.apply(context, args)
    context = args = null
  }

  return function (...theArgs) {
    const now = Date.now
    if (!previous && opts.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    args = theArgs
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = fn.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && opts.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
