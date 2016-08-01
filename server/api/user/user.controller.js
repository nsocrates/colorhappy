import { signToken } from '../../auth/auth.service'
import * as services from '../api.service'
import { db, pgp } from '../../sqldb'
import { validateUserSignup } from './user.validations'
const { User } = db

// GET to index all users.
export function index(req, res) {
  return User.index()
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// POST to create a new user.
export function create(req, res) {
  return validateUserSignup(req.body)
    .then(() => User.create(req.body))
    .then(user => res.json({
      token: signToken(user.id, user.role_status), user,
    }))
    .catch(services.handleValidationError(res))
}

// GET to show a single user.
export function show(req, res) {
  return User.show({ id: req.params.id })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET palettes by user
export function indexPalettes(req, res) {
  const payload = services.normalizeQuery({ id: req.params.id })(req.query)
  return User.showUserPalettes(payload)
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET palettes favorited by user
export function indexFavorites(req, res) {
  const payload = services.normalizeQuery({ id: req.params.id })(req.query)
  return User.showFavorites(payload)
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}
