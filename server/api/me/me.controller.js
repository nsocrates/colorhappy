import * as services from '../api.service'
import { db, pgp } from '../../sqldb'
const { User } = db

// GET me profile of authenticated user
export function me(req, res) {
  return res.status(200).json(req.user)
}

// GET palettes of authenticated user
export function indexPalettes(req, res) {
  const payload = services.normalizeQuery({ id: req.user.id })(req.query)
  return User.showUserPalettes(payload)
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET favorites of authenticated user
export function indexFavorites(req, res) {
  const payload = services.normalizeQuery({ id: req.user.id })(req.query)
  return User.showFavorites(payload)
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// PUT to update profile of authenticated user.
export function update(req, res) {
  return User.update(Object.assign({}, req.body, { id: req.user.id }))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// PUT to update password of authenticated user.
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
