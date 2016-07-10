import {
  TOGGLE_SIDEBAR,
  CLOSE_ALL,
  CONDENSE_HEADER,
} from 'constants/actionTypes'

import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
  sidebar: false,
  header: false,
}

export default function ui(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebar: typeof action.shouldOpen === 'boolean'
          ? action.shouldOpen
          : !state.sidebar,
      })
    case CONDENSE_HEADER:
      return Object.assign({}, state, {
        header: typeof action.shouldCondense === 'boolean'
          ? action.shouldCondense
          : !state.header,
      })
    case CLOSE_ALL:
    case LOCATION_CHANGE:
      return initialState
    default:
      return state
  }
}
