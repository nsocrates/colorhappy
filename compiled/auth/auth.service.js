'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _composableMiddleware = require('composable-middleware');

var _composableMiddleware2 = _interopRequireDefault(_composableMiddleware);

var _sqldb = require('../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _sqldb.db.User;
// import User from '../api/user/user.model'

/**
 * Attaches the user object to the request if authenticated
 */

function isAuthenticated() {
  return (0, _composableMiddleware2.default)()
  // Validate JWT
  .use((0, _expressJwt2.default)({ secret: _environment2.default.secrets.session }))
  // Attach user to request
  .use(function (req, res, next) {
    return User.show({ id: req.user.id }).then(function (user) {
      if (!user) return res.status(401).end();
      req.user = user;
      next();
      return user;
    }).catch(function (err) {
      return next(err);
    });
  });
}

function signToken(id, role) {
  return _jsonwebtoken2.default.sign({ id: id, role: role }, _environment2.default.secrets.session, {
    expiresIn: 60 * 60 * 24
  });
}

exports.default = {
  isAuthenticated: isAuthenticated,
  signToken: signToken
};