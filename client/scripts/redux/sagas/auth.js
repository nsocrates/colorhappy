import {
  LOGOUT,
  LOGIN,
  SIGNUP,
} from 'constants/actionTypes'

import axios from 'axios'
import { login, signup } from 'actions/auth'
import { take, put, call, fork } from 'redux-saga/effects'
import { api, to } from 'services'

function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  localStorage.setItem('TOKEN', token)
}

function* watchSignup() {
  while (true) {
    const { payload } = yield take(SIGNUP.REQUEST)
    const response = yield call(api.fetchEntity, signup, api.signup, payload)
    if (response.token) {
      yield put(signup.success(response))
      setToken(response.token)
      to('/')
    }
  }
}

export function* watchLogin() {
  while (true) {
    const { payload } = yield take(LOGIN.REQUEST)
    const response = yield call(api.fetchEntity, login, api.login, payload)
    if (response.token) {
      yield put(login.success(response))
      setToken(response.token)
      to('/')
    }
  }
}

function* watchLogout() {
  while (true) {
    yield take(LOGOUT)
    axios.defaults.headers.common.Authorization = ''
    localStorage.removeItem('TOKEN')
  }
}

export default function* authFlow() {
  yield [
    fork(watchLogout),
    fork(watchLogin),
    fork(watchSignup),
  ]
}
