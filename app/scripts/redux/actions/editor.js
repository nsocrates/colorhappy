import {
  CHANGE_RGB,
  CHANGE_HEX,
  CHANGE_HSL,
  NEW_PALETTE,
  UPDATE_COLOR,
  LOAD_COLORS,
  TOGGLE_TOOLBAR,
} from 'constants/actionTypes'
import { action } from 'utils/action'

/* Actions to be used by Sagas
// ================================ */
export const newPalette = payload => action(NEW_PALETTE, { payload })
export const updateColor = payload => action(UPDATE_COLOR, { payload })

/* Actions to be used by Components
// ================================ */
// Payload is an object containing properties of
// 'value' and 'namespace'.
export const changeColor = {

  // Value is a string.
  hex: payload => action(CHANGE_HEX, { payload }),

  // Value is an array.
  rgb: payload => action(CHANGE_RGB, { payload }),
  hsl: payload => action(CHANGE_HSL, { payload }),
}

export const loadColors = payload => action(LOAD_COLORS, { payload })
export const toggleToolbar = payload => action(TOGGLE_TOOLBAR, { payload })
