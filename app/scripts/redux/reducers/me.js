import { combineReducers } from 'redux'
import union from 'lodash/union'
import {
  AUTH_UNFAVORITE,
  AUTH_GET_FAVORITES,
} from 'constants/actionTypes'

const initialState = {
  ids: [],
  isFetching: false,
  pageCount: 0,
  hasMore: false,
}

export const makeReducer = types => (state = initialState, action) => {
  const [request, success, failure, remove] = types

  switch (action.type) {
    case request:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case success:
      return Object.assign({}, state, {
        isFetching: false,
        ids: union(state.ids, action.response.result),
        pageCount: state.pageCount + 1,
        hasMore: !!action.response.result.length,
      })
    case failure:
      return Object.assign({}, state, {
        isFetching: false,
      })
    case remove:
      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== action.payload.id),
      })
    default:
      return state
  }
}

const favorites = makeReducer(Object.values(AUTH_GET_FAVORITES).concat(AUTH_UNFAVORITE.SUCCESS))

export function palettes(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

const me = combineReducers({
  favorites,
  palettes,
})

export default me
