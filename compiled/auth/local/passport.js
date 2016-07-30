'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configurePassport;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAndAuthenticate(User, username, password, done) {
  User.authenticate({
    username: username,
    password: password
  }).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    return done(err);
  });
}

function configurePassport(User) {
  _passport2.default.use(new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false }, function (username, password, done) {
    return findAndAuthenticate(User, username, password, done);
  }));

  _passport2.default.serializeUser(function (user, next) {
    return next(null, user.id);
  });
  _passport2.default.deserializeUser(function (id, next) {
    return User.show({ id: id }).then(function (user) {
      return next(null, user);
    }).catch(function (err) {
      return next(err);
    });
  });
}