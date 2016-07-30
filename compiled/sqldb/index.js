'use strict';

var _pgPromise = require('pg-promise');

var _pgPromise2 = _interopRequireDefault(_pgPromise);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var promise = require('bluebird'); /**
                                    * pg-promise initialization
                                    * =================================================================================
                                    * https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/index.js
                                    */

var options = {
  // Replace the default Promise library with BlueBird.
  promiseLib: promise,
  // Extend the database with custom methods and functions.
  extend: function extend(obj) {
    obj.Palette = (0, _queries2.default)(obj).palette;
    obj.User = (0, _queries2.default)(obj).user;
  }
};

// Initialize pgp, bootstrap configurations, and create the Database object.
var pgp = (0, _pgPromise2.default)(options);
var db = pgp(_environment2.default.pgp);

module.exports = {
  // Library instance is necessary to access all the
  // types and namespaces available within the library's root.
  pgp: pgp,

  // Database instance that contains our Models.
  db: db
};