import { take, call, fork, select } from 'redux-saga/effects'
import { api, tryApi } from 'services'
import { favorite, unfavorite, getFavorites } from 'actions/favorite'
import { createNotif } from 'sagas/notifications'
import { selectSession, selectPalette } from 'reducers/selectors'
import {
  AUTH_FAVORITE,
  AUTH_UNFAVORITE,
  AUTH_GET_FAVORITES,
} from 'constants/actionTypes'

// Binders
const callFavorite = tryApi.bind(null, favorite, api.favoritePalette)
const callUnfavorite = tryApi.bind(null, unfavorite, api.unfavoritePalette)
const callGetFavorites = tryApi.bind(null, getFavorites, api.getUserFavorite)

// Valids palette favorite request; returns a string if the favorite is invalid.
function* isInvalidFavorite(payload) {
  const { isAuthenticated, id } = yield select(selectSession)
  const { userId } = yield select(selectPalette, payload.id)
  if (!isAuthenticated) return 'Login or signup to like this palette'
  if (userId === id) return 'You cannot like your own palette'
  return false
}

// Watches for 'get favorites' request.
function* watchGetFavorites() {
  while (true) {
    const { payload } = yield take(AUTH_GET_FAVORITES.REQUEST)
    yield call(callGetFavorites, payload)
  }
}

// Watches for a like action on palette.
function* watchFavorite() {
  while (true) {
    const { payload } = yield take(AUTH_FAVORITE.REQUEST)
    const isInvalid = yield call(isInvalidFavorite, payload)

    if (isInvalid) {
      yield call(createNotif, { message: isInvalid })
      // Restart watch.
      continue
    }

    const response = yield call(callFavorite, payload)
    if (response) {
      yield call(createNotif, { message: 'Added palette to favorites' })
    } else {
      // Message will default to 'Something went wrong...'
      yield call(createNotif, {})
    }
  }
}

// Watches for unfavorite request.
function* watchUnfavorite() {
  while (true) {
    const { payload } = yield take(AUTH_UNFAVORITE.REQUEST)
    yield call(callUnfavorite, payload)
  }
}

export default function* favoriteFlow() {
  yield [
    fork(watchGetFavorites),
    fork(watchFavorite),
    fork(watchUnfavorite),
  ]
}
