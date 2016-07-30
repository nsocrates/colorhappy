'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 8000; // Base configuration

var config = {
  // Server root
  root: _path2.default.dirname(require.main.filename),
  env: process.env.NODE_ENV,
  port: process.env.PORT || port,
  ip: process.env.IP || '0.0.0.0',
  domain: process.env.DOMAIN || 'http://localhost:' + port,
  secrets: {
    session: process.env.SECRET_SESSION || 'coolcat'
  }
};

exports.default = config;