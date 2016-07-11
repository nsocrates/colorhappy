import { takeEvery } from 'redux-saga'
import { call, fork } from 'redux-saga/effects'
import { user, me } from 'actions/users'
import { USER, ME } from 'constants/actionTypes'
import { api, tryApi } from 'services'

const callUser = tryApi.bind(null, user, api.getUser)
const callMe = tryApi.bind(null, me, api.getUser)

function* userRoutine(apiFn, action) {
  const { payload } = action
  yield call(apiFn, payload)
}

function* watchUser() {
  while (true) {
    yield [
      takeEvery(USER.REQUEST, userRoutine, callUser),
      takeEvery(ME.REQUEST, userRoutine, callMe),
    ]
  }
}

export default function* userFlow() {
  yield [
    fork(watchUser),
  ]
}
