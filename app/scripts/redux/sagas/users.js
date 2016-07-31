import { takeEvery } from 'redux-saga'
import { call, fork, select } from 'redux-saga/effects'
import { user, userPalette, me, updateProfile, changePassword } from 'actions/users'
import { selectPaginatedPalettes } from 'reducers/selectors'
import { createNotif } from 'sagas/notifications'
import { api, tryApi } from 'services'
import {
  USER,
  USER_PALETTE,
  ME,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  LOAD_USER_PALETTES,
  // DELETE_ACCOUNT -- TODO,
} from 'constants/actionTypes'

const callUser = tryApi.bind(null, user, api.getUser)
const callUserPalette = tryApi.bind(null, userPalette, api.getUserPalette)
const callMe = tryApi.bind(null, me, api.getUser)
const callUpdate = tryApi.bind(null, updateProfile, api.updateProfile)
const callChangePassword = tryApi.bind(null, changePassword, api.changePassword)

// Calls one of the API services above.
function* userRoutine(apiFn, action) {
  const { payload } = action
  return yield call(apiFn, payload)
}

// SubRoutine that calls our main routine and publishes a response notification.
function* userUpdateRoutine(apiFn, message, action) {
  const response = yield call(userRoutine, apiFn, action)
  if (response) {
    yield call(createNotif, { message })
  } else {
    yield call(createNotif, {})
  }
}

// Async function that fetches User before Palette.
function* userPaletteRoutine(payload) {
  // Fetch user's profile first.
  const response = yield call(callUser, payload)
  if (response) {
    // Then fetch user's palettes.
    return yield call(callUserPalette, payload)
  }
  return null
}

// Returns false if request has been cached.
function* shouldFetchUserPalettes(payload, isNext) {
  if (isNext) return true
  const { palettesByUser } = yield select(selectPaginatedPalettes)
  const pagedPalettes = palettesByUser[payload.id] || {}
  // Only return if the values in the ids array is empty.
  return !(pagedPalettes.ids && pagedPalettes.ids.length)
}

// Calls userPaletteRoutine if palletes are not in cache.
function* shouldLoadUserPalettes(action) {
  const { payload, isNext } = action
  const shouldCallRoutine = yield call(shouldFetchUserPalettes, payload, isNext)
  if (shouldCallRoutine) {
    yield call(userPaletteRoutine, payload)
  }
}

// Watchers
function* watchUser() {
  while (true) {
    yield [
      takeEvery(LOAD_USER_PALETTES, shouldLoadUserPalettes),
      takeEvery(USER.REQUEST, userRoutine, callUser),
      takeEvery(USER_PALETTE.REQUEST, userRoutine, callUserPalette),
      takeEvery(ME.REQUEST, userRoutine, callMe),
      takeEvery(
        UPDATE_PROFILE.REQUEST,
        userUpdateRoutine,
        callUpdate,
        'Profile successfully updated'
      ),
      takeEvery(
        CHANGE_PASSWORD.REQUEST,
        userUpdateRoutine,
        callChangePassword,
        'Password successfully changed'
      ),
    ]
  }
}

export default function* userFlow() {
  yield [
    fork(watchUser),
  ]
}
