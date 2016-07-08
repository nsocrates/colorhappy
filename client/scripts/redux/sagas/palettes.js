import { PALETTE_ARRAY, PALETTE } from 'constants/actionTypes'
import { paletteArray, palette } from 'actions/palettes'
import { take, put, call, fork } from 'redux-saga/effects'
import { api } from 'services'

export function* watchPaletteArray() {
  while (true) {
    yield take(PALETTE_ARRAY.REQUEST)
    const response = yield call(api.fetchEntity, paletteArray, api.fetchPaletteArray)
    if (response) {
      yield put(paletteArray.success(response))
    }
  }
}

export function* watchPalette() {
  while (true) {
    const { payload } = yield take(PALETTE.REQUEST)
    const response = yield call(api.fetchEntity, palette, api.fetchPalette, payload)
    if (response) {
      yield put(palette.success(response))
    }
  }
}

export default function* paletteFlow() {
  yield [
    fork(watchPaletteArray),
    fork(watchPalette),
  ]
}
