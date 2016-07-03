export function createRequestTypes(base) {
  const REQUEST = 'REQUEST'
  const SUCCESS = 'SUCCESS'
  const FAILURE = 'FAILURE'
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function action(type, payload = {}) {
  return Object.assign({}, { type }, payload)
}
