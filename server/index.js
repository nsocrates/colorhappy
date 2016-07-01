/* eslint-disable no-console */

import express from 'express'
import mongoose from 'mongoose'
import configureExpress from './config/express'
import configureRoutes from './config/routes'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.babel'
import environment from './config/environment'
// We compile SSR middleware first otherwise we get path errors
import SSR_MIDDLEWARE from '../dist/server'
mongoose.Promise = require('bluebird');

// Connect to MongoDB
mongoose.connect(environment.mongo.uri, environment.mongo.opts, err => {
  if (err) throw err
})

// Populate DB with sample data
require('./config/seed')

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

app.listen(app.get('port'), err => {
  if (err) throw err
  console.log(`\nExpress server listening on port ${app.get('port')} in ${app.get('env')} mode`)
})
