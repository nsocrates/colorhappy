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
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

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
          nextPageUrl: action.response.nextPageUrl,
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
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return merge({}, state, {
          [key]: updatePagination(state[key], action),
        })
      }
      default:
        return state
    }
  }
}