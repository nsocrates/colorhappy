import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import secrets from '../config/secrets'
import compose from 'composable-middleware'
import User from '../api/user/user.model'

/**
 * Attaches the user object to the request if authenticated
 */
export function isAuthenticated() {
  return compose()
    // Validate JWT
    .use(expressJwt({ secret: secrets.session }))
    // Attach user to request
    .use((req, res, next) =>
      User.findById(req.user.id).exec()
        .then(user => {
          if (!user) return res.status(401).end()
          req.user = user
          next()
          return user
        })
        .catch(err => next(err))
    )
}

export function signToken(id, role) {
  return jwt.sign({ id, role }, secrets.session, {
    expiresIn: 60 * 60 * 24,
  })
}

export default {
  isAuthenticated,
  signToken,
}
