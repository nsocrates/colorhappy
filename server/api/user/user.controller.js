import User from './user.model'
import { signToken } from '../../auth/auth.service'

function handleValidationError(res, statusCode = 422) {
  return err => {
    console.log(err)
    return res.status(statusCode).json(err)
  }
}

function handleError(res, statusCode = 500) {
  return err => {
    console.log(err)
    return res.status(statusCode).send(err)
  }
}

/**
 * Adds regex token to ignore whitespace
 */
function chunk(str) {
  return str.split('').map(subStr => `${subStr}\\s*`).join('')
}

/**
 * User route handlers
 */

const controller = {
  // POST to create a new user
  create(req, res) {
    return User.findOne({ email: req.body.email }).exec()
      .then(hasUser => {
        if (hasUser) return res.status(400).send({ message: 'User already exists.' })
        const newUser = new User(req.body)
        Object.keys(newUser.profile).forEach(key => {
          if (req.body.hasOwnProperty(key)
            && req.body[key]
            && req.body[key].trim()) {
            newUser.profile[key] = req.body[key].trim()
          }
        })
        return newUser.save()
          .then(user => {
            const token = signToken(user._id, user.role)
            return res.json({ token, user })
          })
          .catch(handleError(res))
      })
  },

  // GET me profile of authenticated user
  me(req, res, next) {
    // Hide password_hash and __v becaue we don't need them
    return User.findOne({ _id: req.user._id }, '-password_hash -__v').exec()
      .then(user => {
        if (!user) return res.status(401).end()
        return res.status(200).json(user)
      })
      .catch(err => next(err))
  },

  // GET specific profile
  show(req, res, next) {
    return User.findOne({ _id: req.params.id }).exec()
      .then(user => {
        if (!user) return res.status(404).end()
        return res.json(user.profile)
      })
      .catch(err => next(err))
  },

  // GET a list of users matching search query
  find(req, res, next) {
    const decoded = decodeURIComponent(req.query.q.replace(/\+/g, ''))
    const chunked = chunk(decoded)
    const q = new RegExp(`^${chunked}`, 'i')
    return User.find({ 'profile.name': q }, '-password_hash -__V').exec()
      .then(users => res.status(200).json(users))
      .catch(err => next(err))
  },

  // PUT to update user info
  update(req, res) {
    const password = !!req.body.password && String(req.body.password)
    const newPassword = !!req.body.newPassword && String(req.body.newPassword)
    return User.findById(req.user._id).exec()
      .then(user => {
        if (newPassword && user.isMatch(password)) {
          user.password = newPassword
        }
        Object.keys(user.profile).forEach(key => {
          if (req.body.hasOwnProperty(key)) {
            user.profile[key] = req.body[key]
          }
        })
        return user.save()
          .then(savedUser => res.status(200).json(savedUser.profile))
          .catch(handleValidationError(res))
      })
      .catch(handleError(res))
  },
}

export default controller
