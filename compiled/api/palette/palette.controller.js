'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.destroy = destroy;
exports.show = show;
exports.update = update;
exports.favorite = favorite;
exports.unfavorite = unfavorite;
exports.download = download;

var _api = require('../api.service');

var services = _interopRequireWildcard(_api);

var _sqldb = require('../../sqldb');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Palette = _sqldb.db.Palette;

// GET to index all palettes.

function index(req, res) {
  var _req$query = req.query;
  var query = _req$query === undefined ? {} : _req$query;

  var options = {
    limit: query.limit || 10,
    page: query.page || 1,
    sort: query.sort || 'created_at'
  };
  return Palette.index(options).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// POST to create a new palette.
function create(req, res) {
  return Palette.create(Object.assign({}, {
    user_id: req.user.id
  }, req.body)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// DELETE to destroy a palette.
function destroy(req, res) {
  return Palette.destroy({
    id: req.params.id,
    user_id: req.user.id
  }).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// GET to show a palette.
function show(req, res) {
  return Palette.show({ id: req.params.id }).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// PUT to update an existing palette.
function update(req, res) {
  return Palette.update(req.body).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// POST to create a favorite relationship between user and palette.
function favorite(req, res) {
  return Palette.favorite({
    user_id: req.user.id,
    palette_id: req.params.id
  }).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// DELETE to remove a favorite relationship between user and palette.
function unfavorite(req, res) {
  return Palette.unfavorite({
    user_id: req.user.id,
    palette_id: req.params.id
  }).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// GET to download a palette as .scss.
function download(req, res) {
  // Label each hex as '$color[index]' and separate it with a newline.
  var str = req.params.hex.match(/[^-]+/g).map(function (color, i) {
    return '$color' + (i + 1) + ':     #' + color.toLowerCase() + ';\n';
  }).join('');

  // Force file download by setting 'Content-Disposition' in the response header.
  res.set({ 'Content-Disposition': 'attachment; filename=palette.scss' }).send(str);
}