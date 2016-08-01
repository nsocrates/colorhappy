/**
 * https://github.com/reactjs/redux/blob/master/examples/real-world/reducers/paginate.js
 */

import merge from 'lodash/merge'
import union from 'lodash/union'

const initialState = {
  ids: [],
  isFetching: false,
  pageCount: 0,
  hasMore: false,
}

export default function paginate({ types, mapActionToKey }) {
  const [requestType, successType, failureType] = types
  function updatePagination(state = initialState, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true,
        })
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          pageCount: state.pageCount + 1,
          hasMore: !!action.response.result.length,
        })
      case failureType:
        return merge({}, state, {
          isFetching: false,
        })
      default:
        return state
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action)
        return merge({}, state, {
          [key]: updatePagination(state[key], action),
        })
      }
      default:
        return state
    }
  }
}
