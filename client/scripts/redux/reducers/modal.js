import { SHOW_MODAL, HIDE_MODAL } from 'constants/actionTypes'

const initialState = {
  type: null,
  props: {},
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        type: action.payload.type,
        props: action.payload.props,
      }
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}
