import * as services from '../api.service'
import { db, pgp } from '../../sqldb'

const { Palette } = db

// GET to index all palettes.
export function index(req, res) {
  const payload = services.normalizeQuery()(req.query)
  return Palette.index(payload)
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// POST to create a new palette.
export function create(req, res) {
  return Palette.create(Object.assign({}, {
    user_id: req.user.id,
  }, req.body))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// DELETE to destroy a palette.
export function destroy(req, res) {
  return Palette.destroy({
    id: req.params.id,
    user_id: req.user.id,
  })
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET to show a palette.
export function show(req, res) {
  return Palette.show({ id: req.params.id })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// PUT to update an existing palette.
export function update(req, res) {
  return Palette.update(req.body)
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// POST to create a favorite relationship between user and palette.
export function favorite(req, res) {
  return Palette.favorite({
    user_id: req.user.id,
    palette_id: req.params.id,
  })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// DELETE to remove a favorite relationship between user and palette.
export function unfavorite(req, res) {
  return Palette.unfavorite({
    user_id: req.user.id,
    palette_id: req.params.id,
  })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
    .finally(pgp.end())
}

// GET to download a palette as .scss.
export function download(req, res) {
  // Label each hex as '$color[index]' and separate it with a newline.
  const str = req.params.hex.match(/[^-]+/g)
    .map((color, i) => `$color${i + 1}:     #${color.toLowerCase()};\n`)
    .join('')

  // Force file download by setting 'Content-Disposition' in the response header.
  res.set({ 'Content-Disposition': 'attachment; filename=palette.scss' })
    .send(str)
}
