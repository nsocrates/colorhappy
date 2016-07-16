import { notif } from 'actions/notifications'
import { take, call, fork, put } from 'redux-saga/effects'
import { NOTIF_CREATE } from 'constants/actionTypes'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* createNotif(payload) {
  yield put(notif.create(payload))
}

export function* destroyNotif(payload) {
  const { duration, id } = payload
  yield call(delay, duration)
  yield put(notif.destroy({ id }))
}

export function* publishNotif(payload) {
  yield put(notif.publish(payload))
  yield fork(destroyNotif, payload)
}

export function* watchNotifs() {
  while (true) {
    const { payload } = yield take(NOTIF_CREATE)
    const notifPayload = Object.assign({}, {
      id: Date.now(),
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
