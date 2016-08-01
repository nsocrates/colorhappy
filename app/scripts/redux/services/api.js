import axios from 'axios'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'
import { BASE_URL } from 'constants/api'
import { q } from 'utils/transformations'
import { validateUserSignup } from './validation'

/**
 * ****************************************
 * Axios defaults
 * ****************************************
 */
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * ****************************************
 * API function to fetch a response
 * ****************************************
 */
const callApi = schema => (method, endpoint, options) => (
  axios[method](endpoint, options)
    .then(response => {
      const { data } = response
      const collection = data.collection || data

      return schema
        ? Object.assign({}, normalize(collection, schema))
        : collection
    })
    .catch(error => Promise.reject(error))
)

/**
 * ****************************************
 * API helper functions
 * ****************************************
 */
const fetch = callApi()
const fetchUser = callApi(Schemas.User)
const fetchPaletteArray = callApi(Schemas.PaletteArray)
const fetchPalette = callApi(Schemas.Palette)

/**
 * ****************************************
 * API route services
 * ****************************************
 */

// ========================================
// Authentication API
// ========================================
export function signup(payload) {
  return validateUserSignup(payload)
    .then(() => fetch('post', '/api/users/', payload))
    .catch(error => Promise.reject(error))
}
export const login = payload => fetch('post', '/auth/local', payload)

// ========================================
// Me API
// ========================================
export const getMe = () => fetchUser('get', '/api/me')

export const getMePalette = options => {
  const qs = q.stringify(options)
  return fetchPaletteArray('get', `/api/me/palettes?${qs}`)
}

export const getMeFavorite = options => {
  const qs = q.stringify(options)
  return fetchPaletteArray('get', `/api/me/favorites?${qs}`)
}

export const updateProfile = payload => fetchUser('put', '/api/me', payload)
export const changePassword = payload => fetch('put', '/api/me/password', payload)

// ========================================
// User API
// ========================================
export const getUser = ({ id }) => fetchUser('get', `/api/users/${id}`)

export const getUserPalette = ({ id, options }) => {
  const qs = q.stringify(options)
  const endpoint = `/api/users/${id}/palettes?${qs}`
  return fetchPaletteArray('get', endpoint)
}

export const getUserFavorite = ({ id, options }) => {
  const qs = q.stringify(options)
  const endpoint = `/api/users/${id}/favorites?${qs}`
  return fetchPaletteArray('get', endpoint)
}

// ========================================
// Palette API
// ========================================
export const createPalette = payload => fetchPalette('post', '/api/palettes', payload)
export const getPalette = ({ id }) => fetchPalette('get', `/api/palettes/${id}`)
export const favoritePalette = ({ id }) => fetchPalette('post', `/api/palettes/${id}/favorite`)
export const unfavoritePalette = ({ id }) => fetch('delete', `/api/palettes/${id}/favorite`)
export const getPaletteArray = opts => {
  const qs = q.stringify(opts)
  return fetchPaletteArray('get', `/api/palettes?${qs}`)
}
