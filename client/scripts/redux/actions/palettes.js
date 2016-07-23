import { action } from 'utils/action'
import { PALETTE, PALETTE_ARRAY, PALETTE_LOVE, PALETTE_CREATE } from 'constants/actionTypes'

// TODO:
//     limit = 3,

/**
 * Pallet action creator to get a specific palette.
 * @type {Object}
 * @param {Object} [payload] - Data to be used by Axios when performing the fetch
 * @param {String} [payload.id] - The ID of the requested palette.
 */
export const palette = {
  request: payload => action(PALETTE.REQUEST, { payload }),
  success: (payload, response) => action(PALETTE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(PALETTE.FAILURE, { payload, error }),
}

/**
 * Palette array action creator.
 * @type {Object}
 * @param {Object} [options] - Options.
 * @param {('createdAt'|'loveCount'|'viewCount')} [options.sort]
 *   - Allowed sort options (can be prefixed with '-' to descend).
 * @param {String} [options.startId]
 *   - Id of the document to start query for the next set.
 * @param {String} [options.startKey]
 *   - The value of the docuemnt's sort key as it corresponds to the startId.
 */
export const paletteArray = {
  request: options => action(PALETTE_ARRAY.REQUEST, { options }),
  success: (options, response) => action(PALETTE_ARRAY.SUCCESS, { options, response }),
  failure: (options, error) => action(PALETTE_ARRAY.FAILURE, { error }),
}

/**
 * Pallet action creator to love specific palette.
 * @type {Object}
 * @param {Object} [payload] - Data to be used by Axios when performing the fetch
 * @param {String} [payload.id] - The ID of the requested palette.
 */
export const paletteLove = {
  request: payload => action(PALETTE_LOVE.REQUEST, { payload }),
  success: (payload, response) => action(PALETTE_LOVE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(PALETTE_LOVE.FAILURE, { payload, error }),
}

/**
 * Action creator to save a palette.
 * @type {Object}
 * @param {Obect} [payload] - Data to be sent to Axios.
 * @param {String} [payload.title] - Title of the palette.
 * @param {String} [payload.description] - A description of the palette.
 * @param {Array} [payload.colors] - The palette's colors in hexidecimal format.
 */
export const paletteSave = {
  request: payload => action(PALETTE_CREATE.REQUEST, { payload }),
  success: (payload, response) => action(PALETTE_CREATE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(PALETTE_CREATE.FAILURE, { payload, error }),
}
