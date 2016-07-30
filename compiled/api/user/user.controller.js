'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.index = index;
exports.create = create;
exports.show = show;
exports.update = update;
exports.updatePassword = updatePassword;
exports.me = me;
exports.showPalettes = showPalettes;
exports.showFavorites = showFavorites;

var _auth = require('../../auth/auth.service');

var _api = require('../api.service');

var services = _interopRequireWildcard(_api);

var _sqldb = require('../../sqldb');

var _user = require('./user.validations');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _sqldb.db.User;

// GET to index all users.

function index(req, res) {
  return User.index().then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// POST to create a new user.
function create(req, res) {
  return (0, _user.validateUserSignup)(req.body).then(function () {
    return User.create(req.body);
  }).then(function (user) {
    return res.json({
      token: (0, _auth.signToken)(user.id, user.role_status), user: user
    });
  }).catch(services.handleValidationError(res));
}

// GET to show a single user.
function show(req, res) {
  return User.show({ id: req.params.id }).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// PUT to update a user's profile.
function update(req, res) {
  return User.update((0, _assign2.default)({}, req.body, { id: req.user.id })).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// PUT to update a user's password.
function updatePassword(req, res) {
  return User.updatePassword({
    id: req.user.id,
    old_password: req.body.old_password,
    new_password: String(req.body.new_password)
  }).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// GET me profile of authenticated user
function me(req, res) {
  return res.status(200).json(req.user);
}

// GET palettes by user
function showPalettes(req, res) {
  return User.showPalettes({ id: req.params.id }).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}

// GET palettes favorited by user
function showFavorites(req, res) {
  return User.showFavorites({ id: req.params.id }).then(services.handleNotFound(res)).then(services.respondWithResult(res)).catch(services.handleError(res)).finally(_sqldb.pgp.end());
}