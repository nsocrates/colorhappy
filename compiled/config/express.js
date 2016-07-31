'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureExpress;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureExpress(app) {
  app.set('port', _environment2.default.port);
  app.disable('x-powered-by');
  app.set('view cache', false);
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  // Path to the root of our distribution folder.
  app.use(_express2.default.static(_path2.default.join(__dirname, '..', '..', 'dist')));
  app.use((0, _methodOverride2.default)());

  // Initialize Passport
  app.use(_passport2.default.initialize());

  app.use((0, _morgan2.default)('dev'));
  var pe = new _prettyError2.default();
  pe.start();
  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use(function (err, req, res, next) {
    console.log(pe.render(err)); // eslint-disable-line no-console
    next();
  });
}