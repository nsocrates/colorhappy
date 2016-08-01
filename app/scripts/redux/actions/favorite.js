import { action } from 'utils/action'
import {
  UNFAVORITE,
} from 'constants/actionTypes'

/**
 * Sends a request to remove a palette from favorites.
 * @param {String} [payload.id] - ID of the palette to unfavorite.
 */
export const unfavorite = {
  request: payload => action(UNFAVORITE.REQUEST, { payload }),
  success: (payload, response) => action(UNFAVORITE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(UNFAVORITE.FAILURE, { payload, error }),
}
