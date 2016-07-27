import { put, call } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'

export * as api from './api'

// API Fetch subroutine
export function* tryApi(action, apiFn, payload) {
  try {
    const response = yield call(apiFn, payload)
    yield put(action.success(payload, response))
    return response
  } catch (error) {
    yield put(action.failure(payload, error))
    return false
  }
}

export function* tryAuth(action, apiFn, payload) {
  try {
    const { user, token } = yield call(apiFn, payload)
    const response = Object.assign({}, normalize(user, Schemas.User), { token })
    yield put(action.success(payload, response))
    return response
  } catch (error) {
    yield put(action.failure(payload, error))
    return false
  }
}
