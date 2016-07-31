/* eslint-disable no-console */
import path from 'path'
import express from 'express'
import configureExpress from './config/express'
import configureRoutes from './config/routes'
// We compile SSR middleware first otherwise we get path errors
import SSR_MIDDLEWARE from '../dist/assets/server'
// const App = require('../dist/assets/server')
// import htmlfile from '../dist/index.html'

// Initialize server
const app = express()

// Setup Webpack with hot reloading
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require(path.resolve(__dirname, '..', 'webpack.config.babel')).default
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
  app.use(webpackHotMiddleware(compiler))
}

// Bootstrap configurations
configureExpress(app)
configureRoutes(app)

// Register SSR middleware
// app.get('*', App.default)
app.use(SSR_MIDDLEWARE)

app.listen(app.get('port'), () =>
  console.log(`\nExpress server listening on port ${app.get('port')} in ${app.get('env')} mode`))
