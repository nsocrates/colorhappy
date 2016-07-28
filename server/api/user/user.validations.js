import validator from 'validator'

/**
 * Validates username, email, and password.
 * @param  {Object} body - An object containing username, email, and password.
 * @return {Object} - A Promise object; either resolved or rejected.
 */
export function validateUserSignup(body) {
  const errors = []
  const { username, email, password } = body
  if (!validator.isEmail(email)) {
    errors.push({ type: 'email', message: "Doesn't look like a valid email..." })
  }
  if (!validator.isLength(username, { min: 3 })) {
    errors.push({ type: 'username', message: 'Username must be at least 3 characters long' })
  }
  if (!validator.isAlphanumeric(username)) {
    errors.push({ type: 'username', message: 'Username must not contain special characters' })
  }
  if (!validator.isAlpha(username[0])) {
    errors.push({ type: 'username', message: 'Username must begin with a letter' })
  }
  if (!validator.isLength(password, { min: 3 })) {
    errors.push({ type: 'password', message: 'Password must be at least 3 characters long' })
  }
  const sanitized = {
    username: validator.trim(username),
    email: validator.normalizeEmail(email),
    password: String(password),
  }

  return errors.length ? Promise.reject(errors) : Promise.resolve(sanitized)
}
