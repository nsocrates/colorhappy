import { SHOW_MODAL, HIDE_MODAL, CLOSE_ALL } from 'constants/actionTypes'

const initialState = {
  modalComponent: '',
  modalProps: {},
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload
    case HIDE_MODAL:
    case CLOSE_ALL:
      return initialState
    default:
      return state
  }
}
