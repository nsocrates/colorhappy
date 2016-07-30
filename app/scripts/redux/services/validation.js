import validator from 'validator'

// Helper function to create our Promises.
export const validate = value => ({ field, method, message, options = {} }) => (
  new Promise((resolve, reject) => {
    const isOkay = validator[method](value, options)
    return isOkay ? resolve(value) : reject({ field, message })
  })
)

// Validates user input on signup.
export function validateUserSignup({ email, username, password }) {
  const validateEmail = validate(email)
  const validateUsername = validate(username)
  const validatePassword = validate(password)

  return Promise.all([
    validateEmail({
      field: 'email',
      method: 'isEmail',
      message: "Doesn't look like a valid email...",
    }),
    validateUsername({
      field: 'username',
      method: 'isLength',
      options: { min: 3 },
      message: 'Username must be at least 3 characters long',
    }),
    validateUsername({
      field: 'username',
      method: 'isAlphanumeric',
      options: 'en-US',
      message: 'Username must not contain special characters',
    }),
    validatePassword({
      field: 'password',
      method: 'isLength',
      options: { min: 3 },
      message: 'Password must be at least 3 characters long',
    }),
  ])
}
