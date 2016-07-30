'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

/**
 * Authenticate user and get JWT to include in the header
 * of future requests
 */
/**
 * Passport local authentication
 */

router.post('/', function (req, res, next) {
  _passport2.default.authenticate('local', { session: false }, function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json({ message: 'Authentication failed' });
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    var token = (0, _auth.signToken)(user.id, user.role_status);
    return res.json({ token: token, user: user });
  })(req, res, next);
});

exports.default = router;