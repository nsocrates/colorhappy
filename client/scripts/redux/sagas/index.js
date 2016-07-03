import { fork } from 'redux-saga/effects'
import authFlow from './auth'

// Expose sagas to Redux store
// These functions are executed as soon as the Store is ready
export default function* root() {
  yield [
    fork(authFlow),
  ]
}
