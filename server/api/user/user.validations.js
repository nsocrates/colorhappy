import validator from 'validator'

// Helper function to create our Promises.
export const validate = field => ({ method, message, options = {} }) => (
  new Promise((resolve, reject) => {
    const isOkay = validator[method](field, options)
    return isOkay ? resolve(field) : reject({ field, message })
  })
)

// Validates user input on signup.
export function validateUserSignup({ email, username, password }) {
  const validateEmail = validate(email)
  const validateUsername = validate(username)
  const validatePassword = validate(password)

  return Promise.all([
    validateEmail({
      method: 'isEmail',
      message: "Doesn't look like a valid email...",
    }),
    validateUsername({
      method: 'isLength',
      options: { min: 3 },
      message: 'Username must be at least 3 characters long',
    }),
    validateUsername({
      method: 'isAlphanumeric',
      options: 'en-US',
      message: 'Username must not contain special characters',
    }),
    validatePassword({
      method: 'isLength',
      options: { min: 3 },
      message: 'Password must be at least 3 characters long',
    }),
  ])
  .then(() => Promise.resolve({ email, username, password }))
  .catch(error => Promise.reject(error))
}
