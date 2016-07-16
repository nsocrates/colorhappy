import {
  NOTIF_PUBLISH,
  NOTIF_DESTROY,
} from 'constants/actionTypes'

const initialState = []

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case NOTIF_PUBLISH:
      return [action.payload, ...state]
    case NOTIF_DESTROY:
      return state.filter(notif => notif.id !== action.payload.id)
    default:
      return state
  }
}
