'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _pgPromise = require('pg-promise');

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function that links external SQL files.
 * @param  {String} base - Base name of the SQL files.
 * @param {String} service - The action of the SQL file.
 * @param {Object} params - Parameters to pass into QueryFile.
 * @return {Object} - An instance of QueryFile.
 */
var linkSQL = function linkSQL(base) {
  return function (service) {
    return function (params) {
      return (
        // External SQL file
        new _pgPromise.QueryFile(_environment2.default.root + '/sqldb/queries/' + base + '/' + base + '.' + service + '.sql', {
          params: params,
          minify: true
        })
      );
    };
  };
};

/**
 * Helper function to create an object of query actions.
 * @param  {String} base - Base name of the SQL files.
 * @param  {Array} services - An array of services with names matching the SQL files.
 * @return {Object} - An object with mapped services and their corresponding QueryFiles.
 */
var mapQuery = function mapQuery(base) {
  return function (_ref) {
    var _ref$core = _ref.core;
    var core = _ref$core === undefined ? [] : _ref$core;
    var _ref$common = _ref.common;
    var common = _ref$common === undefined ? [] : _ref$common;
    return core.concat(common).reduce(function (acc, service) {
      var key = common.indexOf(service) !== -1 ? 'common' : base;
      acc[service] = linkSQL(key)(service)({ table: 'v_' + base });
      return acc;
    }, {});
  };
};

var palette = mapQuery('palette')({
  common: [],
  core: ['index', 'create', 'destroy', 'update', 'favorite', 'unfavorite', 'showAndUpdate']
});

var user = mapQuery('user')({
  common: ['index', 'show'],
  core: ['authenticate', 'create', 'updatePassword', 'showPalettes', 'showFavorites']
});

/**
 * Helper function to format an object into an SQL query string.
 * @param  {Object} column - Key value pair of the columns to update.
 * @return {String} - SQL string with named parameters.
 */
function sqlify(table, columns) {
  // Map out the columns and assign the named parameters.
  var q = (0, _keys2.default)(columns).reduce(function (acc, key) {
    return (

      // Skip id because we do not want to change that.
      key === 'id' ? acc : acc + ' ' + key + ' = $<' + key + '>,'
    );
  }, 'UPDATE ' + table + ' SET');

  // Remove last comma and append the WHERE clause before returning the string.
  return q.substr(0, q.length - 1) + ' WHERE id = $<id> RETURNING *;';
}

/**
 * Normalizes pagination query.
 * @param  {Number} options.limit - Maximum number of results to return.
 * @param  {Number} options.page - First n pages to skip.
 * @param  {String} options.sort - Sort order (required in order to return a predictable set).
 * @return {Object} - Object to be passed in as SQL named parameters.
 */
function paginate(_ref2) {
  var _ref2$limit = _ref2.limit;
  var limit = _ref2$limit === undefined ? 10 : _ref2$limit;
  var _ref2$page = _ref2.page;
  var page = _ref2$page === undefined ? 1 : _ref2$page;
  var _ref2$sort = _ref2.sort;
  var sort = _ref2$sort === undefined ? 'created_at' : _ref2$sort;

  return {
    // Convert page into offset by calculating the number of rows to skip.
    page: limit * (page - 1),
    limit: +limit,
    sort: sort
  };
}

/**
 * A protocol object that we expose to pgp.
 * It contains the repository for our database, which can be called through db.
 * @param  {Object} db - pgp Database protocol
 * @return {Object} - Palette object and User object
 */
var queries = function queries(db) {
  return {
    palette: {
      index: function index(payload) {
        return db.any(palette.index, paginate(payload));
      },
      show: function show(payload) {
        return db.oneOrNone(palette.showAndUpdate, payload);
      },
      create: function create(body) {
        return db.one(palette.create, body);
      },
      update: function update(payload) {
        return db.one(palette.update, payload);
      },
      destroy: function destroy(payload) {
        return db.none(palette.destroy, payload);
      },
      favorite: function favorite(payload) {
        return db.one(palette.favorite, payload);
      },
      unfavorite: function unfavorite(payload) {
        return db.none(palette.unfavorite, payload);
      }
    },

    user: {
      authenticate: function authenticate(payload) {
        return db.one(user.authenticate, payload);
      },
      index: function index() {
        return db.any(user.index);
      },
      show: function show(payload) {
        return db.oneOrNone(user.show, payload);
      },
      create: function create(payload) {
        return db.one(user.create, payload);
      },
      update: function update(payload) {
        return db.one(sqlify('Users', payload), payload);
      },
      updatePassword: function updatePassword(payload) {
        return db.one(user.updatePassword, payload);
      },
      showPalettes: function showPalettes(payload) {
        return db.any(user.showPalettes, payload);
      },
      showFavorites: function showFavorites(payload) {
        return db.any(user.showFavorites, payload);
      }
    }
  };
};

exports.default = queries;