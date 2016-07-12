import { takeEvery } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import { user, me, updateProfile, changePassword } from 'actions/users'
import { api, tryApi } from 'services'
import {
  USER,
  ME,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  // DELETE_ACCOUNT,
} from 'constants/actionTypes'

const callUser = tryApi.bind(null, user, api.getUser)
const callMe = tryApi.bind(null, me, api.getUser)
const callUpdate = tryApi.bind(null, updateProfile, api.updateProfile)
const callChangePassword = tryApi.bind(null, changePassword, api.changePassword)

function* userRoutine(apiFn, action) {
  const { payload } = action
  yield call(apiFn, payload)
}

function* watchUser() {
  while (true) {
    yield [
      takeEvery(USER.REQUEST, userRoutine, callUser),
      takeEvery(ME.REQUEST, userRoutine, callMe),
      takeEvery(UPDATE_PROFILE.REQUEST, userRoutine, callUpdate),
      takeEvery(CHANGE_PASSWORD.REQUEST, userRoutine, callChangePassword),
    ]
  }
}

export default function* userFlow() {
  yield [
    fork(watchUser),
  ]
}
