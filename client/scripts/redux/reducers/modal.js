import { SHOW_MODAL, HIDE_MODAL } from 'constants/actionTypes'

const initialState = {
  modalComponent: '',
  modalProps: {},
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}
