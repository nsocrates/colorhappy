/**
 * pg-promise initialization
 */

import pgPromise from 'pg-promise'
import entities from './queries'
import config from '../config/environment'

const promise = require('bluebird')

const options = {
  // Replace the default Promise library with BlueBird.
  promiseLib: promise,
  // Extend the database with custom methods and functions.
  extend: obj => {
    obj.Palette = entities(obj).palette
    obj.User = entities(obj).user
  },
}

// Initialize pgp, bootstrap configurations, and create the Database object.
const pgp = pgPromise(options)
const db = pgp(config.pgp)

module.exports = {
  // Library instance is necessary to access all the
  // types and namespaces available within the library's root.
  pgp,

  // Database instance that contains our Models.
  db,
}
