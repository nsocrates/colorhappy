import {
  USER,
  ME,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  DISABLE_ACCOUNT,
  USER_PALETTE,
  USER_FAVORITE,
  LOAD_USER_PALETTES,
  LOAD_USER_FAVORITES,
} from 'constants/actionTypes'
import { action } from 'utils/action'

export const user = {
  request: payload => action(USER.REQUEST, { payload }),
  success: (payload, response) => action(USER.SUCCESS, { payload, response }),
  failure: (payload, error) => action(USER.FAILURE, { payload, error }),
}

export const userPalette = {
  request: payload => action(USER_PALETTE.REQUEST, { payload }),
  success: (payload, response) => action(USER_PALETTE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(USER_PALETTE.FAILURE, { payload, error }),
}

export const userFavorite = {
  request: payload => action(USER_FAVORITE.REQUEST, { payload }),
  success: (payload, response) => action(USER_FAVORITE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(USER_FAVORITE.FAILURE, { payload, error }),
}

export const me = {
  request: () => action(ME.REQUEST, { payload: { id: 'me' } }),
  success: (payload, response) => action(ME.SUCCESS, { payload, response }),
  failure: (payload, error) => action(ME.FAILURE, { payload, error }),
}

export const updateProfile = {
  request: payload => action(UPDATE_PROFILE.REQUEST, { payload }),
  success: (payload, response) => action(UPDATE_PROFILE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(UPDATE_PROFILE.FAILURE, { payload, error }),
}

export const changePassword = {
  request: payload => action(CHANGE_PASSWORD.REQUEST, { payload }),
  success: (payload, response) => action(CHANGE_PASSWORD.SUCCESS, { payload, response }),
  failure: (payload, error) => action(CHANGE_PASSWORD.FAILURE, { payload, error }),
}

export const disableAccount = {
  request: payload => action(DISABLE_ACCOUNT.REQUEST, { payload }),
  success: (payload, response) => action(DISABLE_ACCOUNT.SUCCESS, { payload, response }),
  failure: (payload, error) => action(DISABLE_ACCOUNT.FAILURE, { payload, error }),
}

// Payload is an object with property name 'id'
export const loadUserPalettes = payload => action(LOAD_USER_PALETTES, { payload })

// Load initial palette favorite list
export const loadUserFavorites = (payload, isNext) =>
  action(LOAD_USER_FAVORITES, { payload, isNext })
