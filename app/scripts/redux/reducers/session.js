import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  SET_TOKEN,
  ME,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  CLEAR_ERRORS,
} from 'constants/actionTypes'

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  isUpdatingAccount: false,
  errors: [],
  token: '',
  id: '',
}

export default function session(state = initialState, action) {
  switch (action.type) {
    case ME.SUCCESS:
      return Object.assign({}, state, {
        id: action.response.result,
      })
    case SET_TOKEN:
      return {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
      }
    case LOGIN.REQUEST:
    case SIGNUP.REQUEST:
      return {
        isAuthenticating: true,
        isAuthenticated: false,
        errors: [],
      }
    case LOGIN.SUCCESS:
    case SIGNUP.SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.response.token,
        id: action.response.result,
      })
    case LOGIN.FAILURE:
    case SIGNUP.FAILURE:
      return Object.assign({}, initialState, {
        errors: action.error,
      })

    case CLEAR_ERRORS:
      return Object.assign({}, state, {
        errors: [],
      })

    case CHANGE_PASSWORD.REQUEST:
    case UPDATE_PROFILE.REQUEST:
      return Object.assign({}, state, {
        isUpdatingAccount: true,
      })

    case CHANGE_PASSWORD.SUCCESS:
    case UPDATE_PROFILE.SUCCESS:
    case CHANGE_PASSWORD.FAILURE:
    case UPDATE_PROFILE.FAILURE:
      return Object.assign({}, state, {
        isUpdatingAccount: false,
      })
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
