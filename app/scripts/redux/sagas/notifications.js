import { notif } from 'actions/notifications'
import { take, call, fork, put } from 'redux-saga/effects'
import { NOTIF_CREATE } from 'constants/actionTypes'

// Timer for self destruct
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Used by other Sagas to generate notifications
export function* createNotif(payload) {
  yield put(notif.create(payload))
}

// Dispatches a destroy action when timer runs out
export function* destroyNotif(payload) {
  const { duration, id } = payload
  yield call(delay, duration)
  yield put(notif.destroy({ id }))
}

// Dispatches a publish action to add the notif to the State
// and forks an instance of destroyNotif
export function* publishNotif(payload) {
  yield put(notif.publish(payload))
  yield fork(destroyNotif, payload)
}

// Watches for a NOTIF_CREATE action and attaches an id, duration, and action
// to the payload unless already set.
export function* watchNotifs() {
  while (true) {
    const { payload } = yield take(NOTIF_CREATE)
    const notifPayload = Object.assign({}, {
      id: Date.now(),
      // Default message.
      message: 'Something went wrong...',
      duration: 4000,
      action: 'dismiss',
    }, payload)

    yield fork(publishNotif, notifPayload)
  }
}

export default function* notificationFlow() {
  yield [
    fork(watchNotifs),
  ]
}
