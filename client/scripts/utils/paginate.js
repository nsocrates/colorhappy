import merge from 'lodash/merge'
import union from 'lodash/union'
const initialState = {
  ids: [],
  nextHref: undefined,
  isFetching: false,
  pageCount: 0,
}

export default function paginate({ types, hasSelection }) {
  const [requestType, successType, failureType] = types
  return function updatePagination(state = initialState, action) {
    if (hasSelection(action)) {
      switch (action.type) {
        case requestType:
          return merge({}, state, {
            isFetching: true,
          })
        case successType:
          return merge({}, state, {
            isFetching: false,
            ids: union(state.ids, action.response.result),
            nextHref: action.response.nextHref,
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
