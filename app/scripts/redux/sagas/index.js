import { fork } from 'redux-saga/effects'
import authFlow from './auth'
import paletteFlow from './palettes'
import uiFlow from './ui'
import userFlow from './users'
import notificationFlow from './notifications'
import editorFlow from './editor'

// Expose sagas to Redux store
// These functions are executed as soon as the Store is ready
export default function* root() {
  yield [
    fork(authFlow),
    fork(paletteFlow),
    fork(uiFlow),
    fork(userFlow),
    fork(notificationFlow),
    fork(editorFlow),
  ]
}
