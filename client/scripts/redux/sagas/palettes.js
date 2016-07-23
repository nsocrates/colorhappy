import { PALETTE, PALETTE_ARRAY, PALETTE_LOVE, PALETTE_CREATE } from 'constants/actionTypes'
import { palette, paletteArray, paletteLove, paletteSave } from 'actions/palettes'
import { modal } from 'actions/modal'
import { take, call, fork, select, put } from 'redux-saga/effects'
import { api, tryApi } from 'services'
import { createNotif } from 'sagas/notifications'
import { selectSession, selectPalette } from 'reducers/selectors'
import { validateHex } from 'utils/color/helpers'

const callPalette = tryApi.bind(null, palette, api.getPalette)
const callPaletteArray = tryApi.bind(null, paletteArray, api.getPaletteArray)
const callPaletteLove = tryApi.bind(null, paletteLove, api.getPaletteLove)
const callPaletteCreate = tryApi.bind(null, paletteSave, api.createPalette)

// Valids palette love request; returns a string if the love is invalid.
function* isInvalidLove(payload) {
  const { isAuthenticated, id } = yield select(selectSession)
  const { userId } = yield select(selectPalette, payload.id)
  if (!isAuthenticated) return 'Login or signup to love this palette'
  if (userId === id) return 'You cannot love your own palette'
  return false
}

function* watchPaletteArray() {
  while (true) {
    const { options } = yield take(PALETTE_ARRAY.REQUEST)
    yield call(callPaletteArray, options)
  }
}

function* watchPalette() {
  while (true) {
    const { payload } = yield take(PALETTE.REQUEST)
    yield call(callPalette, payload)
  }
}

function* watchPaletteLove() {
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

// Watches for 'PALETTE_CREATE_REQUEST' action
function* watchPaletteCreate() {
  while (true) {
    const { payload } = yield take(PALETTE_CREATE.REQUEST)
    const { colors } = payload
    const validated = colors.map(color => validateHex(color))
    if (!validated.every(valid => !!valid)) {
      yield call(createNotif, { message: `Invalid color in list: ${validated}` })
      continue
    }

    const response = yield call(callPaletteCreate, payload)
    if (response) {
      yield call(createNotif, { message: 'New pallet has been created' })
      yield put(modal.hide())
    } else {
      yield call(createNotif, { message: 'Palette could not be saved' })
    }
  }
}

export default function* paletteFlow() {
  yield [
    fork(watchPaletteCreate),
    fork(watchPaletteLove),
    fork(watchPaletteArray),
    fork(watchPalette),
  ]
}
