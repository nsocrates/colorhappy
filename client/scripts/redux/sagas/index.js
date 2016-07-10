import { fork } from 'redux-saga/effects'
import authFlow from './auth'
import paletteFlow from './palettes'
import uiFlow from './ui'

// Expose sagas to Redux store
// These functions are executed as soon as the Store is ready
export default function* root() {
  yield [
    fork(authFlow),
    fork(paletteFlow),
    fork(uiFlow),
  ]
}
