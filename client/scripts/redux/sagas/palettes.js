import { PALETTE_ARRAY, PALETTE, PALETTE_LOVE } from 'constants/actionTypes'
import { paletteArray, palette, paletteLove } from 'actions/palettes'
import { take, call, fork } from 'redux-saga/effects'
import { api, callApi } from 'services'

const callPalette = callApi.bind(null, palette, api.getPalette)
const callPaletteArray = callApi.bind(null, paletteArray, api.getPaletteArray)
const callPaletteLove = callApi.bind(null, paletteLove, api.getPaletteLove)

export function* watchPaletteArray() {
  while (true) {
    const { options } = yield take(PALETTE_ARRAY.REQUEST)
    yield call(callPaletteArray, options)
  }
}

export function* watchPalette() {
  while (true) {
    const { payload } = yield take(PALETTE.REQUEST)
    yield call(callPalette, payload.id)
  }
}

export function* watchPaletteLove() {
  while (true) {
    const { payload } = yield take(PALETTE_LOVE.REQUEST)
    yield call(callPaletteLove, payload.id)
  }
}

export default function* paletteFlow() {
  yield [
    fork(watchPaletteLove),
    fork(watchPaletteArray),
    fork(watchPalette),
  ]
}
