import Palette from './palette.model'
import * as services from '../api.service'
import User from '../user/user.model'

// Helper function to increment / decrement counts
const updateUserLoveCount = (req, inc) => palette => {
  if (palette) {
    User.findByIdAndUpdate(req.user._id, {
      $inc: { loveCount: inc },
    }, {
      upsert: false,
      new: true,
    }).exec()
  }
  return palette
}

// Helper function to increment / decrement counts
const updateUserPaletteCount = (req, inc) => palette => {
  User.findByIdAndUpdate(req.user._id, {
    $inc: { paletteCount: inc },
  }, {
    upsert: false,
    new: true,
  }).exec()
  return palette
}

// GET to index all palettes
export function index(req, res) {
  return Palette.paginate({}, {
    select: '-loves',
    populate: ['user'],
    offset: req.query.offset || 0,
    limit: req.query.limit || 25,
  })
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// POST to create a new palette
export function create(req, res) {
  return Palette.create(Object.assign({}, {
    user: req.user,
    userId: req.user._id,
  }, req.body))
    .then(updateUserPaletteCount(req, 1))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// DELETE to destroy a palette
export function destroy(req, res) {
  return Palette.matchCriteria(req).exec()
    .then(services.handleNotFound(res))
    .then(updateUserPaletteCount(req, -1))
    .then(services.removeEntity(res))
    .catch(services.handleError(res))
}

// GET to show a palette
export function show(req, res) {
  return Palette.findAndView(req).exec()
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// PUT to update an existing palette
export function update(req, res) {
  return Palette.matchCriteria(req).exec()
    .then(services.handleNotFound(res))
    .then(services.saveUpdates(req.body))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// PUT to love a palette
export function love(req, res) {
  return Palette.findAndLove(req).exec()
    .then(updateUserLoveCount(req, 1))
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// DELETE to unlove a palette
export function unlove(req, res) {
  return Palette.findAndUnlove(req).exec()
    .then(updateUserLoveCount(req, -1))
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}
