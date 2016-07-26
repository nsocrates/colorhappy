import { QueryFile } from 'pg-promise'
import config from '../../config/environment'

/**
 * Helper function that links external SQL files.
 * @param  {String} base - Base name of the SQL files.
 * @param {String} service - The action of the SQL file.
 * @param {Object} params - Parameters to pass into QueryFile.
 * @return {Object} - An instance of QueryFile.
 */
const linkSQL = base => service => params => (
  // External SQL file
  new QueryFile(`${config.root}/sqldb/queries/${base}/${base}.${service}.sql`, {
    params,
    minify: true,
  })
)

/**
 * Helper function to create an object of query actions.
 * @param  {String} base - Base name of the SQL files.
 * @param  {Array} services - An array of services with names matching the SQL files.
 * @return {Object} - An object with mapped services and their corresponding QueryFiles.
 */
const mapQuery = base => ({ core = [], common = [] }) => (
  core.concat(common)
    .reduce((acc, service) => {
      const key = common.indexOf(service) !== -1 ? 'common' : base
      acc[service] = linkSQL(key)(service)({ table: `v_${base}` })
      return acc
    }, {})
)

const palette = mapQuery('palette')({
  common: [],
  core: ['index', 'create', 'destroy', 'update', 'favorite', 'unfavorite', 'showAndUpdate'],
})

const user = mapQuery('user')({
  common: ['index', 'show'],
  core: ['authenticate', 'create', 'updatePassword', 'showPalettes', 'showFavorites'],
})

/**
 * Helper function to format an object into an SQL query string.
 * @param  {Object} column - Key value pair of the columns to update.
 * @return {String} - SQL string with named parameters.
 */
function sqlify(table, columns) {
  // Map out the columns and assign the named parameters
  const q = Object.keys(columns).reduce((acc, key) => (
    // Skip id because we do not want to change that.
    key === 'id' ? acc : `${acc} ${key} = $<${key}>,`
  ), `UPDATE ${table} SET`)

  // Remove last comma and append the WHERE clause before returning.
  return `${q.substr(0, q.length - 1)} WHERE id = $<id> RETURNING *;`
}

/**
 * A protocol object that we expose to pgp.
 * It contains the repository for our database, which can be called through db.
 * @param  {Object} db - pgp Database protocol
 * @return {Object} - Palette entity and User entity
 */
const entities = db => ({
  palette: {
    index: () => db.any(palette.index),
    show: payload => db.oneOrNone(palette.showAndUpdate, payload),
    create: body => db.one(palette.create, body),
    update: payload => db.one(palette.update, payload),
    destroy: payload => db.none(palette.destroy, payload),
    favorite: payload => db.one(palette.favorite, payload),
    unfavorite: payload => db.none(palette.unfavorite, payload),
  },

  user: {
    authenticate: payload => db.one(user.authenticate, payload),
    index: () => db.any(user.index),
    show: payload => db.oneOrNone(user.show, payload),
    create: payload => db.one(user.create, payload),
    update: payload => db.one(sqlify('Users', payload), payload),
    updatePassword: payload => db.one(user.updatePassword, payload),
    showPalettes: payload => db.any(user.showPalettes, payload),
    showFavorites: payload => db.any(user.showFavorites, payload),
  },
})

export default entities