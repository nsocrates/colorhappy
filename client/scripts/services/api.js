import axios from 'axios'
import validator from 'validator'

// Set defaults for axios
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// API function to fetch a response
function callApi(method, endpoint, options) {
  return axios[method](endpoint, options)
    .then(response => response.data)
    .catch(error => Promise.reject([{ message: error.data.message || 'Something went wrong...' }]))
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
  return callApi('post', '/api/users/', { email, username, password })
}

export const login = data => callApi('post', '/auth/local', data)
export const getMe = () => callApi('get', '/api/users/me')
export const updateMe = body => callApi('put', '/api/users/me', body)
