import { PALETTE_ARRAY, PALETTE, PALETTE_LOVE } from 'constants/actionTypes'
import { paletteArray, palette, paletteLove } from 'actions/palettes'
import { take, call, fork } from 'redux-saga/effects'
import { api, tryApi } from 'services'

const callPalette = tryApi.bind(null, palette, api.getPalette)
const callPaletteArray = tryApi.bind(null, paletteArray, api.getPaletteArray)
const callPaletteLove = tryApi.bind(null, paletteLove, api.getPaletteLove)

export function* watchPaletteArray() {
  while (true) {
    const { options } = yield take(PALETTE_ARRAY.REQUEST)
    yield call(callPaletteArray, options)
  }
}

export function* watchPalette() {
  while (true) {
    const { payload } = yield take(PALETTE.REQUEST)
    yield call(callPalette, payload)
  }
}

export function* watchPaletteLove() {
  while (true) {
    const { payload } = yield take(PALETTE_LOVE.REQUEST)
    yield call(callPaletteLove, payload)
  }
}

export default function* paletteFlow() {
  yield [
    fork(watchPaletteLove),
    fork(watchPaletteArray),
    fork(watchPalette),
  ]
}
