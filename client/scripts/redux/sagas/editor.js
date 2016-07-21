import { updateColor, newPalette } from 'actions/editor'
import { takeEvery } from 'redux-saga'
import { take, call, fork, put } from 'redux-saga/effects'
import { round, hex, rgb, hsl } from 'utils/color/index'
import {
  CHANGE_HEX,
  CHANGE_RGB,
  CHANGE_HSL,
  LOAD_COLORS,
} from 'constants/actionTypes'

// Conversion subroutines
export const roundHexToRgb = hx => round(hex.toRgb(hx))
export const roundHexToHsl = hx => round(hex.toHsl(hx))

export const convertRgbToHex = rb => rgb.toHex(rb)
export const roundRgbToHsl = rb => round(rgb.toHsl(rb))

export const convertHslToHex = hl => round(hsl.toHex(hl))
export const roundHslToRgb = hl => round(hsl.toRgb(hl))

/**
 * Constructs a model for the editor reducer.
 * @param  {array} colors - Color values in hexidecimal format.
 * @return {object} All colors in a single entity.
 */
const mapInitialValues = colors => (
  Object.assign({}, ...colors.map((color, index) => ({
    [`color${index + 1}`]: {
      hex: hex.validateHex(color),
      rgb: roundHexToRgb(color),
      hsl: roundHexToHsl(color),
    },
  })))
)

/**
 * Converts a color value to its corresponding types.
 * @param  {string} colorType - Either 'hex', 'rgb', or 'hsl'.
 * @param  {string} colorValue - The value of the color to convert.
 * @return {object} An object containing the initial value
 * and its corresponding conversions.
 */
function assignValues(colorType, colorValue) {
  switch (colorType) {
    case 'hex':
      return {
        hex: hex.validateHex(colorValue),
        rgb: roundHexToRgb(colorValue),
        hsl: roundHexToHsl(colorValue),
      }
    case 'rgb':
      return {
        hex: convertRgbToHex(colorValue),
        rgb: colorValue,
        hsl: roundRgbToHsl(colorValue),
      }
    case 'hsl':
      return {
        hex: convertHslToHex(colorValue),
        rgb: roundHslToRgb(colorValue),
        hsl: colorValue,
      }
    default:
      throw new Error(`Invalid color type: ${colorType}`)
  }
}

/**
 * Subroutine for handling color change
 */
export function* changeRoutine(colorType, action) {
  const { value, namespace } = action.payload
  const values = yield call(assignValues, colorType, value)
  yield put(updateColor({ namespace, values }))
}

/**
 * Allows multiple changeRoutine instances to be fired concurrently.
 */
export function* watchColorChange() {
  while (true) {
    yield [
      takeEvery(CHANGE_HEX, changeRoutine, 'hex'),
      takeEvery(CHANGE_RGB, changeRoutine, 'rgb'),
      takeEvery(CHANGE_HSL, changeRoutine, 'hsl'),
    ]
  }
}

/**
 * Watches for LOAD_COLORS action and runs the necessary
 * routines before dispatching the pallet to the Store.
 */
export function* watchInitialLoad() {
  while (true) {
    const { payload } = yield take(LOAD_COLORS)

    // Prepare initial palette for editor
    // const colors = payload.colors.match(/[^-]+/g)
    const colors = Array.isArray(payload.colors)
      ? payload.colors
      : payload.colors.match(/[^-]+/g)

    const palette = yield call(mapInitialValues, colors)

    // Set the palette
    yield put(newPalette({ palette }))
  }
}

export default function* editorFlow() {
  yield [
    fork(watchInitialLoad),
    fork(watchColorChange),
  ]
}
