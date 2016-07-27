/* eslint-disable no-console */

import express from 'express'
import configureExpress from './config/express'
import configureRoutes from './config/routes'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.babel'

// We compile SSR middleware first otherwise we get path errors
import SSR_MIDDLEWARE from '../dist/server'

// Initialize server
const app = express()

// Setup Webpack with hot reloading
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
app.use(webpackHotMiddleware(compiler))

// Bootstrap configurations
configureExpress(app)
configureRoutes(app)

// Register SSR middleware
app.use(SSR_MIDDLEWARE)

app.listen(app.get('port'), () =>
  console.log(`\nExpress server listening on port ${app.get('port')} in ${app.get('env')} mode`))
