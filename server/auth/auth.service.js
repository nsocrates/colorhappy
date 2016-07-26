import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../config/environment'
import compose from 'composable-middleware'
import { db } from '../sqldb'
const { User } = db
// import User from '../api/user/user.model'

/**
 * Attaches the user object to the request if authenticated
 */
export function isAuthenticated() {
  return compose()
    // Validate JWT
    .use(expressJwt({ secret: config.secrets.session }))
    // Attach user to request
    .use((req, res, next) =>
      User.show({ id: req.user.id })
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
  return jwt.sign({ id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 24,
  })
}

export default {
  isAuthenticated,
  signToken,
}
