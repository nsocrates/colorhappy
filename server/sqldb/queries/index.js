import { QueryFile } from 'pg-promise'
import config from '../../config/environment'

// pg-promise helper function for querying external SQL files.
const sql = path => filename => params => (
  new QueryFile(`${config.root}/sqldb/queries${path}/${filename}`, {
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
const mapQuery = base => services => {
  const common = ['index', 'show']
  return services.concat(common)
    .reduce((acc, service) => {
      const key = common.indexOf(service) !== -1 ? 'common' : base
      acc[service] = sql(`/${key}`)(`${key}.${service}.sql`)({ table: `${base}s` })
      return acc
    }, {})
}

const paletteServices = ['create', 'destroy', 'update', 'favorite', 'unfavorite']
const palette = mapQuery('palette')(paletteServices)

const userServices = ['create']
const user = mapQuery('user')(userServices)

/**
 * A protocol object that we expose to pgp.
 * It contains the repository for our database, which can be called through db.
 * @param  {Object} db - pgp Database protocol
 * @return {Object} - Palette entity and User entity
 */
const entities = db => ({
  palette: {
    index: () => db.any(palette.index),
    show: payload => db.oneOrNone(palette.show, payload),
    create: body => db.one(palette.create, body),
    update: payload => db.one(palette.update, payload),
    destroy: payload => db.none(palette.destroy, payload),
    favorite: payload => db.one(palette.favorite, payload),
    unfavorite: payload => db.none(palette.unfavorite, payload),
  },

  user: {
    index: () => db.any(user.index),
    create: payload => db.one(user.create, payload),
  },
})

export default entities
