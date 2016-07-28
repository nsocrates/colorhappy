import { toggleSidebar, closeAll } from 'actions/ui'
import { selectSidebar } from 'reducers/selectors'
import { take, call, fork, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Side effect.
function handleBodyOverflow(shouldHide) {
  if (shouldHide) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}

// Calls handleBodyOverflow after delay timer.
export function* modalRoutine() {
  // We add a delay here so that LOCATION_CHANGE doesn't reset body overflow.
  yield call(delay, 0)
  yield call(handleBodyOverflow, true)
}

// Watches for route transitions;
// calls modalRoutine if we are routing into a modal.
export function* watchLocationChange() {
  while (true) {
    const { payload } = yield take(LOCATION_CHANGE)
    const { state } = payload
    if (state && state.isModal) {
      yield call(modalRoutine)
    }
  }
}

// Calls handleBodyOverflow in response to sidebar visibility.
export function* watchSidebar() {
  while (true) {
    const { shouldOpen } = yield take(toggleSidebar)

    // If shouldOpen is not specified, we have to get the value from its reducer.
    const shouldHideOverflow = typeof shouldOpen === 'undefined'
      ? yield select(selectSidebar)
      : shouldOpen

    yield call(handleBodyOverflow, shouldHideOverflow)
  }
}

// Hides body overflow on cue.
export function* watchCloseAll() {
  while (true) {
    yield take(closeAll)
    yield call(handleBodyOverflow, false)
  }
}

export default function* uiFlow() {
  yield [
    fork(watchLocationChange),
    fork(watchCloseAll),
    fork(watchSidebar),
  ]
}
