import {
  LOGOUT,
  LOGIN,
  SIGNUP,
  SET_TOKEN,
  ME,
} from 'constants/actionTypes'

import axios from 'axios'
import { takeEvery } from 'redux-saga'
import { take, put, call, fork, race } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { api, tryAuth } from 'services'
import { login, signup, logout } from 'actions/auth'
import { me } from 'actions/users'

const trySignup = tryAuth.bind(null, signup, api.signup)
const tryLogin = tryAuth.bind(null, login, api.login)

// Side effects
function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem('TOKEN', token)
  return token
}

function removeToken() {
  axios.defaults.headers.common.Authorization = ''
  localStorage.removeItem('TOKEN')
  return null
}

function* authenticate(token) {
  yield call(setToken, token)
  yield put(me.request())

  const { success } = yield race({
    success: take(ME.SUCCESS),
    failure: take(ME.FAILURE),
  })

  if (success && success.response) {
    // Expect a logout action after authentication
    yield take(LOGOUT)
    yield call(removeToken)
  } else {
    // Something went wrong...remove token
    yield put(logout())
  }
}

// Subroutine for handling authentication requests
function* authenticationRoutine(apiFn, action) {
  const { payload } = action
  const { token } = yield call(apiFn, payload)
  if (token) {
    yield fork(authenticate, token)
    yield put(push('/'))
  }
}

export function* watchAuth() {
  while (true) {
    yield [
      takeEvery(LOGIN.REQUEST, authenticationRoutine, tryLogin),
      takeEvery(SIGNUP.REQUEST, authenticationRoutine, trySignup),
    ]
  }
}

function* watchToken() {
  while (true) {
    const { payload } = yield take(SET_TOKEN)
    yield call(authenticate, payload.token)
  }
}

export default function* authFlow() {
  yield [
    fork(watchToken),
    fork(watchAuth),
  ]
}
