import axios from 'axios'
import validator from 'validator'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'

// Set defaults for axios
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// API function to fetch a response
const fetchApi = schema => (method, endpoint, options) => (
  axios[method](endpoint, options)
    .then(response => {
      const { data } = response
      const { count, token } = data
      const collection = data.collection || data

      return schema
        ? Object.assign({}, normalize(collection, schema), { count, token })
        : collection
    })
    .catch(error => Promise.reject([{
      message: error.data && error.data.message || error || 'Something went wrong...',
    }]))
)

const fetch = fetchApi(null)
const fetchUser = fetchApi(Schemas.User)
const fetchPaletteArray = fetchApi(Schemas.PaletteArray)
const fetchPalette = fetchApi(Schemas.Palette)

// API services
export function signup({ email, username, password, passwordConfirm }) {
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
  if (!validator.equals(password, passwordConfirm)) {
    errors.push({ type: 'passwordConfirm', message: 'Password does not match' })
  }
  if (errors.length) {
    return Promise.reject(errors)
  }

  // Call our API request function if validation passes
  return fetch('post', '/api/users/', { email, username, password })
}

export const login = payload => fetchUser('post', '/auth/local', payload)
export const getMe = () => fetchUser('get', '/api/users/me')
export const updatePassword = body => fetch('put', '/api/users/me/password', body)
export const getPalette = id => fetchPalette('get', `/api/palettes/${id}`)
export const getPaletteArray = () => fetchPaletteArray('get', '/api/palettes')

export const getPaletteLove = id => fetch('put', `/api/palettes/${id}/love`)

