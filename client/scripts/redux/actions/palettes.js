import { action } from 'utils/action'
import { PALETTE_ARRAY, PALETTE } from 'constants/actionTypes'

export const paletteArray = {
  request: () => action(PALETTE_ARRAY.REQUEST),
  success: response => action(PALETTE_ARRAY.SUCCESS, { response }),
  failure: error => action(PALETTE_ARRAY.FAILURE, { error }),
}

export const palette = {
  request: payload => action(PALETTE.REQUEST, { payload }),
  success: response => action(PALETTE.SUCCESS, { response }),
  failure: error => action(PALETTE.FAILURE, { error }),
}
