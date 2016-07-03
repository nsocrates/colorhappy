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

export function* callApi(action, apiFn, data) {
  try {
    const response = yield call(apiFn, data)
    return response
  } catch (error) {
    yield put(action.failure(error))
    return false
  }
}

function* watchSignup() {
  while (true) {
    const { data } = yield take(SIGNUP.REQUEST)
    const response = yield call(callApi, signup, api.signup, data)
    if (response.token) {
      yield put(signup.success(response))
      setToken(response.token)
      to('/')
    }
  }
}

export function* watchLogin() {
  while (true) {
    const { data } = yield take(LOGIN.REQUEST)
    const response = yield call(callApi, login, api.login, data)
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
