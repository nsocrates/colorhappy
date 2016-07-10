import { action } from 'utils/action'
import { PALETTE_ARRAY, PALETTE, PALETTE_LOVE } from 'constants/actionTypes'

export const paletteArray = {
  request: options => action(PALETTE_ARRAY.REQUEST, { options }),
  success: (options, response) => action(PALETTE_ARRAY.SUCCESS, { options, response }),
  failure: (options, error) => action(PALETTE_ARRAY.FAILURE, { error }),
}

export const palette = {
  request: payload => action(PALETTE.REQUEST, { payload }),
  success: (payload, response) => action(PALETTE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(PALETTE.FAILURE, { payload, error }),
}

export const paletteLove = {
  request: payload => action(PALETTE_LOVE.REQUEST, { payload }),
  success: (payload, response) => action(PALETTE_LOVE.SUCCESS, { payload, response }),
  failure: (payload, error) => action(PALETTE_LOVE.FAILURE, { payload, error }),
}
