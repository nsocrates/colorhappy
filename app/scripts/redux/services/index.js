import { put, call } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import Schemas from 'constants/schemas'
import { createNotif } from 'sagas/notifications'
import { modal } from 'actions/modal'

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

// API Authentication subroutine
export function* tryAuth(action, apiFn, payload) {
  try {
    const { user, token } = yield call(apiFn, payload)
    const response = Object.assign({}, normalize(user, Schemas.User), { token })
    yield put(action.success(payload, response))
    // Close the modal.
    yield put(modal.hide())
    return response
  } catch (error) {
    yield put(action.failure(payload, error))
    // Create a notification for failed Authentication.
    yield call(createNotif, {
      message: error.message,
    })
    return false
  }
}
