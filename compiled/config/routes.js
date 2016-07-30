'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureRoutes;

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _auth = require('../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureRoutes(app) {
  app.use('/api', _api2.default);
  app.use('/auth', _auth2.default);
}