import {
  LOGOUT,
  LOGIN,
  SIGNUP,
  SET_TOKEN,
} from 'constants/actionTypes'

import axios from 'axios'
import { login, signup } from 'actions/auth'
import { takeEvery } from 'redux-saga'
import { take, put, call, fork } from 'redux-saga/effects'
import { api, callApi } from 'services'
import { push } from 'react-router-redux'

const callSignup = callApi.bind(null, signup, api.signup)
const callLogin = callApi.bind(null, login, api.login)

// Side effects
function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem('TOKEN', token)
}

function removeToken() {
  axios.defaults.headers.common.Authorization = ''
  localStorage.removeItem('TOKEN')
}

function* authenticate(token) {
  setToken(token)

  // Expect a logout action after authentication
  yield take(LOGOUT)
  yield call(removeToken)
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

function* watchAuth() {
  while (true) {
    yield [
      takeEvery(LOGIN.REQUEST, authenticationRoutine, callLogin),
      takeEvery(SIGNUP.REQUEST, authenticationRoutine, callSignup),
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
