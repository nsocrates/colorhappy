import axios from 'axios'
import validator from 'validator'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'
import { q } from 'utils/transformations'

// Set defaults for axios
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// API function to fetch a response
const callApi = schema => (method, endpoint, options) => (
  axios[method](endpoint, options)
    .then(response => {
      const { data } = response
      // const { count, startId, startKey } = data
      const collection = data.collection || data

      return schema
        ? Object.assign({}, normalize(collection, schema))
        : collection
    })
    .catch(error => Promise.reject([{
      message: error.data && error.data.message || error || 'Something went wrong...',
    }]))
)

// API helper functions
const fetch = callApi()
const fetchUser = callApi(Schemas.User)
const fetchPaletteArray = callApi(Schemas.PaletteArray)
const fetchPalette = callApi(Schemas.Palette)

// API services
export function signup({ email, username, password }) {
  // Run through Validator first
  const errors = []
  if (!validator.isEmail(email)) {
    errors.push({ type: 'email', message: "Doesn't look like a valid email..." })
  }
  if (!validator.isLength(username, { min: 3 })) {
    errors.push({ type: 'username', message: 'Username must be at least 3 characters long' })
  }
  if (!validator.isLength(password, { min: 3 })) {
    errors.push({ type: 'password', message: 'Password must be at least 3 characters long' })
  }
  if (errors.length) {
    return Promise.reject(errors)
  }

  // Call our API request function if validation passes
  return fetch('post', '/api/users/', { email, username, password })
}

export const login = payload => fetch('post', '/auth/local', payload)
export const getUser = ({ id }) => fetchUser('get', `/api/users/${id}`)
export const getUserPalette = ({ id }) => fetchPaletteArray('get', `/api/users/${id}/palettes`)
export const updateProfile = payload => fetchUser('put', '/api/users/me', payload)
export const changePassword = payload => fetch('put', '/api/users/me/password', payload)
export const getPalette = ({ id }) => fetchPalette('get', `/api/palettes/${id}`)
export const getPaletteLove = ({ id }) => fetchPalette('post', `/api/palettes/${id}/favorite`)
export const getPaletteArray = opts => {
  const qs = q.stringify(opts)
  return fetchPaletteArray('get', `/api/palettes?${qs}`)
}

export const createPalette = payload => fetchPalette('post', '/api/palettes', payload)
