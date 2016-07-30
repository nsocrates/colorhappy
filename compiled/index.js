'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _express3 = require('./config/express');

var _express4 = _interopRequireDefault(_express3);

var _routes = require('./config/routes');

var _routes2 = _interopRequireDefault(_routes);

var _server = require('../dist/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize server
var app = (0, _express2.default)();

// Setup Webpack with hot reloading

// We compile SSR middleware first otherwise we get path errors
/* eslint-disable no-console */
if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConfig = require(_path2.default.resolve(__dirname, '..', 'webpack.config.babel')).default;
  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(compiler));
}

// Bootstrap configurations
(0, _express4.default)(app);
(0, _routes2.default)(app);

// Register SSR middleware
// app.get('*', SSR_MIDDLEWARE)
app.use(_server2.default);

app.listen(app.get('port'), function () {
  return console.log('\nExpress server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});