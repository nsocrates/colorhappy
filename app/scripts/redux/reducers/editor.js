import {
  UPDATE_COLOR,
  NEW_PALETTE,
  LOAD_COLORS,
  TOGGLE_TOOLBAR,
} from 'constants/actionTypes'
import merge from 'lodash/merge'

// Node doesn't allow us to assign an iteration function...
const initialState = Object.assign({}, ...[1, 2, 3, 4, 5].map(i => ({
  [`color${i}`]: {
    hex: '',
    rgb: [],
    hsl: [],
    isVisible: false,
  },
})), { hasLoaded: false })

export default function editor(state = initialState, action) {
  switch (action.type) {
    case LOAD_COLORS:
      return Object.assign({}, state, {
        hasLoaded: false,
      })

    case NEW_PALETTE:
      return merge({}, initialState, action.payload.palette, {
        hasLoaded: true,
      })

    case UPDATE_COLOR:
      return merge({}, state, {
        [action.payload.namespace]: action.payload.values,
      })

    case TOGGLE_TOOLBAR:
      return merge({}, state, {
        [action.payload.namespace]: {
          isVisible: action.payload.isVisible || !state[action.payload.namespace].isVisible,
        },
      })

    default:
      return state
  }
}
