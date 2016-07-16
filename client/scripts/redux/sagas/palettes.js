import { PALETTE_ARRAY, PALETTE, PALETTE_LOVE } from 'constants/actionTypes'
import { paletteArray, palette, paletteLove } from 'actions/palettes'
import { take, call, fork, select } from 'redux-saga/effects'
import { api, tryApi } from 'services'
import { createNotif } from 'sagas/notifications'
import { selectSession, selectPalette } from 'reducers/selectors'

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

export function* isInvalidLove(payload) {
  const { isAuthenticated, id } = yield select(selectSession)
  const { userId } = yield select(selectPalette, payload.id)
  if (!isAuthenticated) return 'Login or signup to love this palette'
  if (userId === id) return 'You cannot love your own palette'
  return false
}

export function* watchPaletteLove() {
  while (true) {
    const { payload } = yield take(PALETTE_LOVE.REQUEST)
    const isInvalid = yield call(isInvalidLove, payload)

    if (isInvalid) {
      yield call(createNotif, { message: isInvalid })
      continue
    }

    const response = yield call(callPaletteLove, payload)
    if (response) {
      yield call(createNotif, { message: 'Successfully loved palette' })
    } else {
      yield call(createNotif, { message: 'Something went wrong...' })
    }
  }
}

export default function* paletteFlow() {
  yield [
    fork(watchPaletteLove),
    fork(watchPaletteArray),
    fork(watchPalette),
  ]
}
