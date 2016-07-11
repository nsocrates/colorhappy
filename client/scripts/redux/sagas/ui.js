import { toggleSidebar, closeAll } from 'actions/ui'
import { selectSidebar } from 'reducers/selectors'
import { take, call, fork, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function handleBodyOverflow(shouldHide) {
  if (shouldHide) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}

export function* modalRoutine() {
  // We need a delay so that LOCATION_CHANGE doesn't reset body overflow
  yield call(delay, 0)
  yield call(handleBodyOverflow, true)
}

export function* watchLocationChange() {
  while (true) {
    const { payload } = yield take(LOCATION_CHANGE)
    const { state } = payload
    if (state && state.isModal) {
      yield call(modalRoutine)
    }
  }
}

export function* watchCloseAll() {
  while (true) {
    yield take(closeAll)
    yield call(handleBodyOverflow, false)
  }
}

export function* watchSidebar() {
  while (true) {
    const { shouldOpen } = yield take(toggleSidebar)

    const shouldHideOverflow = typeof shouldOpen === 'undefined'
      ? yield select(selectSidebar)
      : shouldOpen

    yield call(handleBodyOverflow, shouldHideOverflow)
  }
}

export default function* uiFlow() {
  yield [
    fork(watchLocationChange),
    fork(watchCloseAll),
    fork(watchSidebar),
  ]
}
