/**
 * Passport local authentication
 */

import { Router } from 'express'
import passport from 'passport'
import { signToken } from '../auth.service'

const router = new Router()

/**
 * Authenticate user and get JWT to include in the header
 * of future requests
 */
router.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    const error = err || info
    if (error) return res.status(401).json(error)
    if (!user) return res.status(404).json({ message: 'Something went wrong...' })
    const token = signToken(user.id, user.role_status)
    return res.json({ token, user })
  })(req, res, next)
})

export default router
