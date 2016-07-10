import { PALETTE_ARRAY, PALETTE } from 'constants/actionTypes'
import { paletteArray, palette } from 'actions/palettes'
import { take, call, fork } from 'redux-saga/effects'
import { api } from 'services'

const fetchPalette = api.fetchEntity.bind(null, palette, api.fetchPalette)
const fetchPaletteArray = api.fetchEntity.bind(null, paletteArray, api.fetchPaletteArray)

export function* watchPaletteArray() {
  while (true) {
    const { options } = yield take(PALETTE_ARRAY.REQUEST)
    yield call(fetchPaletteArray, options)
  }
}

export function* watchPalette() {
  while (true) {
    const { payload } = yield take(PALETTE.REQUEST)
    yield call(fetchPalette, payload)
  }
}

export default function* paletteFlow() {
  yield [
    fork(watchPaletteArray),
    fork(watchPalette),
  ]
}
