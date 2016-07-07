import User from './user.model'
import Palette from '../palette/palette.model'
import { signToken } from '../../auth/auth.service'
import * as services from '../api.service'

// Helper function to update password
const changePassword = res => (oldPass, newPass) => user => {
  user.password = String(newPass)
  return user.isMatch(String(oldPass))
    .then(() => user.save())
    .then(() => res.status(204).end())
    .catch(services.handleValidationError(res, 403))
}

// POST to create a new user
export function create(req, res) {
  return User.create(req.body)
    .then(user => res.json({ token: signToken(user._id, user.role), user }))
    .catch(services.handleValidationError(res))
}

// GET me profile of authenticated user
export function me(req, res) {
  return User
    .findOne({ _id: req.user._id })
    .populate('palettes', '-userId -user')
    .exec()
      .then(services.respondWithResult(res))
      .catch(services.handleError(res))
}

// GET specific profile
export function show(req, res) {
  return User.findOne({ _id: req.params.id }).exec()
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// GET palettes by user
export function showPalettes(req, res) {
  return Palette.find({ userId: req.params.id }).exec()
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// GET palettes loved by user
export function showLoves(req, res) {
  return Palette.find({ loves: req.params.id }).exec()
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// PUT to update user password
export function updatePassword(req, res) {
  const { password, newPassword } = req.body
  return User.findById(req.user._id, '+password_hash').exec()
    .then(changePassword(res)(password, newPassword))
    .catch(services.handleError(res))
}
