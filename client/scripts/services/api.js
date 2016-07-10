import axios from 'axios'
import validator from 'validator'
import { put, call } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'

// Set defaults for axios
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// API function to fetch a response
const callApi = (method, endpoint, options) => schema => (
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

// Fetch subroutine
export function* fetchEntity(action, apiFn, payload) {
  try {
    const response = yield call(apiFn, payload)
    yield put(action.success(payload, response))
    return response
  } catch (error) {
    yield put(action.failure(payload, error))
    return false
  }
}

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
  return callApi('post', '/api/users/', { email, username, password })(null)
}

export const login = payload => callApi('post', '/auth/local', payload)(Schemas.User)
export const getMe = () => callApi('get', '/api/users/me')(Schemas.User)
export const updatePassword = body => callApi('put', '/api/users/me/password', body)(null)
export const fetchPaletteArray = () => callApi('get', '/api/palettes')(Schemas.PaletteArray)
export const fetchPalette = ({ id }) => callApi('get', `/api/palettes/${id}`)(Schemas.Palette)
