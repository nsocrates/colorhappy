import * as services from '../api.service'
import { db } from '../../sqldb'

const { Palette } = db

// GET to index all palettes.
export function index(req, res) {
  return Palette.index()
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// POST to create a new palette.
export function create(req, res) {
  return Palette.create(Object.assign({}, {
    user_id: req.user,
  }, req.body))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// DELETE to destroy a palette.
export function destroy(req, res) {
  return Palette.destroy({
    id: req.params.id,
    user_id: req.user_id,
  })
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// GET to show a palette.
export function show(req, res) {
  return Palette.show({ id: req.params.id })
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// PUT to update an existing palette.
export function update(req, res) {
  return Palette.update(req.body)
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// PUT to love a palette.
export function love(req, res) {
  return Palette.favorite(req.body)
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
}

// DELETE to unlove a palette.
export function unlove(req, res) {
  return Palette.unfavorite(req.body)
    .then(services.handleNotFound(res))
    .then(services.respondWithResult(res))
    .catch(services.handleError(res))
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
