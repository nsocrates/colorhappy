import {
  LOGOUT,
  LOGIN,
  SIGNUP,
  SET_TOKEN,
} from 'constants/actionTypes'

import axios from 'axios'
import { login, signup } from 'actions/auth'
import { take, put, call, fork } from 'redux-saga/effects'
import { api } from 'services'
import { push } from 'react-router-redux'

const fetchSignup = api.fetchEntity.bind(null, signup, api.signup)
const fetchLogin = api.fetchEntity.bind(null, login, api.login)

// Side effects
function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem('TOKEN', token)
}

function removeToken() {
  axios.defaults.headers.common.Authorization = ''
  localStorage.removeItem('TOKEN')
}

function* authorize(token) {
  // First expect an authorization request
  setToken(token)
  yield put(push('/'))

  // Followed by a logout action
  yield take(LOGOUT)
  yield call(removeToken)
}

function* watchSignup() {
  while (true) {
    const { payload } = yield take(SIGNUP.REQUEST)
    const { token } = yield call(fetchSignup, payload)
    if (!token) continue
    yield call(authorize, token)
  }
}

function* watchAuth() {
  while (true) {
    const { payload } = yield take(LOGIN.REQUEST)
    const { token } = yield call(fetchLogin, payload)
    if (!token) continue
    yield call(authorize, token)
  }
}

function* watchToken() {
  while (true) {
    const { payload } = yield take(SET_TOKEN)
    yield call(authorize, payload.token)
  }
}

export default function* authFlow() {
  yield [
    fork(watchToken),
    fork(watchAuth),
    fork(watchSignup),
  ]
}
