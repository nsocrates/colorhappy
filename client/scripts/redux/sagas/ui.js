import { toggleSidebar, closeAll } from 'actions/ui'
import { selectSidebar, selectRouting } from 'reducers/selectors'
import { take, call, fork, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function handleBodyOverflow(shouldHide) {
  if (shouldHide) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}

export function* watchLocationChange() {
  while (true) {
    yield take(LOCATION_CHANGE)
    const routing = yield select(selectRouting)
    if (routing.state && routing.state.isModal) {
      yield call(delay, 0)
      yield call(handleBodyOverflow, true)
    } else if (routing.state && routing.state.isReturnPath) {
      yield call(handleBodyOverflow, false)
    }
  }
}

export function* watchCloseAll() {
  yield take(closeAll)
  yield call(handleBodyOverflow, false)
}

export function* watchSidebar() {
  while (true) {
    yield take(toggleSidebar)
    const shouldHide = yield select(selectSidebar)
    yield call(handleBodyOverflow, shouldHide)
  }
}

export default function* uiFlow() {
  yield [
    fork(watchLocationChange),
    fork(watchCloseAll),
    fork(watchSidebar),
  ]
}
