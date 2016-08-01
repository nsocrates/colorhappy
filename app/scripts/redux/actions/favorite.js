import { action } from 'utils/action'
import {
  AUTH_UNFAVORITE,
  AUTH_FAVORITE,
  AUTH_GET_FAVORITES,
} from 'constants/actionTypes'

/**
 * Sends a request to remove a palette from favorites.
 * @param {String} [payload.id] - ID of the palette to unfavorite.
 */
export const unfavorite = {
  request: payload => action(AUTH_UNFAVORITE.REQUEST, { payload }),
  success: (payload, response) => action(AUTH_UNFAVORITE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(AUTH_UNFAVORITE.FAILURE, { payload, error }),
}

/**
 * Sends a request to all a palette to favorites.
 * @param {String} [payload.id] - ID of the palette to unfavorite.
 */
export const favorite = {
  request: payload => action(AUTH_FAVORITE.REQUEST, { payload }),
  success: (payload, response) => action(AUTH_FAVORITE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(AUTH_FAVORITE.FAILURE, { payload, error }),
}

/**
 * Index auth user's favorite palettes
 * @param {Object} [payload] - Pagination options.
 */
export const getFavorites = {
  request: payload => action(AUTH_GET_FAVORITES.REQUEST, { payload }),
  success: (payload, response) => action(AUTH_GET_FAVORITES.SUCCESS, { payload, response }),
  failure: (payload, error) => action(AUTH_GET_FAVORITES.FAILURE, { payload, error }),
}
