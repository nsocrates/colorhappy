import { selectSidebar } from 'reducers/selectors'
import { takeLatest } from 'redux-saga'
import { take, call, fork, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import {
  SHOW_MODAL,
  HIDE_MODAL,
  CLOSE_ALL,
  TOGGLE_SIDEBAR,
} from 'constants/actionTypes'

// Side effect that controls overflow.
function handleBodyOverflow(shouldHide) {
  if (shouldHide) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}

// Calls our overflow handler. That's all it does.
function* callOverflowHandler(shouldHideOverflow) {
  yield call(handleBodyOverflow, shouldHideOverflow)
}

// Calls handleBodyOverflow in response to sidebar visibility.
function* watchSidebar() {
  while (true) {
    const { shouldOpen } = yield take(TOGGLE_SIDEBAR)

    // If shouldOpen is not specified, we have to get the value from its reducer.
    const shouldHideOverflow = typeof shouldOpen === 'undefined'
      ? yield select(selectSidebar)
      : shouldOpen

    yield call(callOverflowHandler, shouldHideOverflow)
  }
}

// Generic modal watcher.
export function* watchModal() {
  while (true) {
    yield [
      takeLatest(LOCATION_CHANGE, callOverflowHandler, false),
      takeLatest(CLOSE_ALL, callOverflowHandler, false),
      takeLatest(HIDE_MODAL, callOverflowHandler, false),
      takeLatest(SHOW_MODAL, callOverflowHandler, true),
    ]
  }
}

export default function* uiFlow() {
  yield [
    fork(watchModal),
    fork(watchSidebar),
  ]
}
