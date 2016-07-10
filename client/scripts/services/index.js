import { put, call } from 'redux-saga/effects'

export * as api from './api'

// API Fetch subroutine
export function* callApi(action, apiFn, payload) {
  try {
    const response = yield call(apiFn, payload)
    yield put(action.success(payload, response))
    return response
  } catch (error) {
    yield put(action.failure(payload, error))
    return false
  }
}
