import axios from 'axios'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'
import { q } from 'utils/transformations'
import { validateUserSignup } from './validation'

// Set defaults for axios
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// API function to fetch a response
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

// API helper functions
const fetch = callApi()
const fetchUser = callApi(Schemas.User)
const fetchPaletteArray = callApi(Schemas.PaletteArray)
const fetchPalette = callApi(Schemas.Palette)

// API services
export function signup(payload) {
  // Run through Validator first
  return validateUserSignup(payload)
    .then(() => fetch('post', '/api/users/', payload))
    .catch(error => Promise.reject(error))
}

// Shame list..
export const login = payload => fetch('post', '/auth/local', payload)
export const changePassword = payload => fetch('put', '/api/users/me/password', payload)
export const getUser = ({ id }) => fetchUser('get', `/api/users/${id}`)
export const updateProfile = payload => fetchUser('put', '/api/users/me', payload)
export const createPalette = payload => fetchPalette('post', '/api/palettes', payload)
export const getPalette = ({ id }) => fetchPalette('get', `/api/palettes/${id}`)
export const getPaletteLove = ({ id }) => fetchPalette('post', `/api/palettes/${id}/favorite`)

export const getPaletteArray = opts => {
  const qs = q.stringify(opts)
  return fetchPaletteArray('get', `/api/palettes?${qs}`)
}

export const getUserPalette = ({ id, opts }) => {
  const qs = q.stringify(opts)
  return fetchPaletteArray('get', `/api/users/${id}/palettes?${qs}`)
}

