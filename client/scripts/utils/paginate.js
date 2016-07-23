import merge from 'lodash/merge'
import union from 'lodash/union'
const initialState = {
  ids: [],
  startId: null,
  startKey: null,
  isFetching: false,
  pageCount: 0,
}

export default function paginate({ types, hasSortOption }) {
  const [requestType, successType, failureType] = types
  return function updatePagination(state = initialState, action) {
    if (!hasSortOption || hasSortOption(action)) {
      switch (action.type) {
        case requestType:
          return merge({}, state, {
            isFetching: true,
          })
        case successType:
          return merge({}, state, {
            isFetching: false,
            ids: union(state.ids, action.response.result),
            startId: action.response.startId,
            startKey: action.response.startKey,
            pageCount: state.pageCount + 1,
          })
        case failureType:
          return merge({}, state, {
            isFetching: false,
          })
        default:
          return state
      }
    }
    return state
  }
}
