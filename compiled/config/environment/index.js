'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _development = require('./development');

var _development2 = _interopRequireDefault(_development);

var _production = require('./production');

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = {
  development: _development2.default,
  production: _production2.default
};

function getValidEnv(allowed, env) {
  var isValid = !!env && allowed.indexOf(env) !== -1;
  return isValid ? env : 'development';
}

var buildConfig = function buildConfig(cfg) {
  return function (env) {
    var allowedEnvs = Object.keys(cfg);
    var envToUse = getValidEnv(allowedEnvs, env);
    return cfg[envToUse];
  };
};

exports.default = buildConfig(configs)(process.env.NODE_ENV);