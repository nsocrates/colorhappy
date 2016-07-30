import {
  PALETTE,
  PALETTE_LOVE,
  PALETTE_CREATE,
  LOAD_PALETTES,
} from 'constants/actionTypes'
import { palette, paletteArray, paletteLove, paletteSave } from 'actions/palettes'
import { modal } from 'actions/modal'
import { take, call, fork, select, put } from 'redux-saga/effects'
import { api, tryApi } from 'services'
import { createNotif } from 'sagas/notifications'
import { selectSession, selectPalette, selectPaginatedPalettes } from 'reducers/selectors'
import { validateHex } from 'utils/color/helpers'

const callPalette = tryApi.bind(null, palette, api.getPalette)
const callPaletteArray = tryApi.bind(null, paletteArray, api.getPaletteArray)
const callPaletteLove = tryApi.bind(null, paletteLove, api.getPaletteLove)
const callPaletteCreate = tryApi.bind(null, paletteSave, api.createPalette)

// Valids palette favorite request; returns a string if the favorite is invalid.
function* isInvalidLove(payload) {
  const { isAuthenticated, id } = yield select(selectSession)
  const { userId } = yield select(selectPalette, payload.id)
  if (!isAuthenticated) return 'Login or signup to like this palette'
  if (userId === id) return 'You cannot like your own palette'
  return false
}

// Returns false if palette has been cached.
export function* shouldFetchPalettes(options, isNext) {
  if (isNext) return true
  const { palettesBySortOrder } = yield select(selectPaginatedPalettes)
  const pagedPalettes = palettesBySortOrder[options.sort] || {}
  // Only return if the values in the ids array is empty.
  return !(pagedPalettes.ids && pagedPalettes.ids.length)
}

// Watches for a palette.
function* watchPalette() {
  while (true) {
    const { payload } = yield take(PALETTE.REQUEST)
    yield call(callPalette, payload)
  }
}

// Watches for an action to load palettes.
function* watchPaletteArray() {
  while (true) {
    const { options, isNext } = yield take(LOAD_PALETTES)
    const shouldCallPalette = yield call(shouldFetchPalettes, options, isNext)
    if (shouldCallPalette) {
      yield put(paletteArray.request(options))
      yield call(callPaletteArray, options)
    }
  }
}

// Watches for a like action on palette.
function* watchPaletteLove() {
  while (true) {
    const { payload } = yield take(PALETTE_LOVE.REQUEST)
    const isInvalid = yield call(isInvalidLove, payload)

    if (isInvalid) {
      yield call(createNotif, { message: isInvalid })
      // Restart watch.
      continue
    }

    const response = yield call(callPaletteLove, payload)
    if (response) {
      yield call(createNotif, { message: 'Added palette to favorites' })
    } else {
      // Message will default to 'Something went wrong...'
      yield call(createNotif, {})
    }
  }
}

// Watches for 'PALETTE_CREATE_REQUEST' action
function* watchPaletteCreate() {
  while (true) {
    const { payload } = yield take(PALETTE_CREATE.REQUEST)
    const { colors } = payload

    // Make sure all hexidecimal values are valid colors before sending it to the server.
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
