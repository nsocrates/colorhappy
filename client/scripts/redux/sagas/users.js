import { takeEvery } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import { user, userPalette, me, updateProfile, changePassword } from 'actions/users'
import { createNotif } from 'sagas/notifications'
import { api, tryApi } from 'services'
import {
  USER,
  USER_PALETTE,
  ME,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  // DELETE_ACCOUNT,
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

// Monolithic watch Saga.
function* watchUser() {
  while (true) {
    yield [
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
