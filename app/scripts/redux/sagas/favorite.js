import { take, call, fork } from 'redux-saga/effects'
import { api, tryApi } from 'services'
import { unfavorite } from 'actions/favorite'
import {
  UNFAVORITE,
} from 'constants/actionTypes'

const callUnfavorite = tryApi.bind(null, unfavorite, api.unfavoritePalette)

function* watchUnfavorite() {
  while (true) {
    const { payload } = yield take(UNFAVORITE.REQUEST)
    yield call(callUnfavorite, payload)
  }
}

export default function* favoriteFlow() {
  yield [
    fork(watchUnfavorite),
  ]
}
