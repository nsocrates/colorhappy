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

// PUT to update a user's profile.
export function update(req, res) {
  return User.update(Object.assign({}, req.body, { id: req.user.id }))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// PUT to update a user's password.
export function updatePassword(req, res) {
  return User.updatePassword({
    id: req.user.id,
    old_password: req.body.old_password,
    new_password: String(req.body.new_password),
  })
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET me profile of authenticated user
export function me(req, res) {
  return res.status(200).json(req.user)
}

// GET palettes by user
export function showPalettes(req, res) {
  return User.showPalettes({ id: req.params.id })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET palettes favorited by user
export function showFavorites(req, res) {
  return User.showFavorites({ id: req.params.id })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}
