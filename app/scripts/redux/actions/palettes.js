import { action } from 'utils/action'
import {
  PALETTE,
  PALETTE_ARRAY,
  PALETTE_LOVE,
  PALETTE_CREATE,
  LOAD_PALETTES,
} from 'constants/actionTypes'

/**
 * Pallet action creator to get a specific palette.
 * @type {Object}
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
 * @param {('created_at'|'favorite_count'|'view_count'|'title')} [options.sort]
 *   - Allowed sort options.
 * @param {String} [options.page]
 *   - Page to return results from.
 * @param {String} [options.limit]
 *   - Maximum amount of documents returned.
 *  @param {boolean} [isNext] - Should skip page check.
 */
export const paletteArray = {
  request: (options, isNext) => action(PALETTE_ARRAY.REQUEST, { options, isNext }),
  success: (options, response) => action(PALETTE_ARRAY.SUCCESS, { options, response }),
  failure: (options, error) => action(PALETTE_ARRAY.FAILURE, { error }),
}

/**
 * Pallet action creator to add a palette to favorites.
 * @type {Object}
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
 * @param {String} [payload.title] - Title of the palette.
 * @param {String} [payload.description] - A description of the palette.
 * @param {Array[5]} [payload.colors] - The palette's colors in hexidecimal format.
 */
export const paletteSave = {
  request: payload => action(PALETTE_CREATE.REQUEST, { payload }),
  success: (payload, response) => action(PALETTE_CREATE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(PALETTE_CREATE.FAILURE, { payload, error }),
}

// Load initial palette list
export const loadPalettes = (options, isNext) => action(LOAD_PALETTES, { options, isNext })
