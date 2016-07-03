import { action } from 'utils/action'
import { LOGIN, SIGNUP, LOGOUT, SET_TOKEN } from 'constants/actionTypes'

export const login = {
  request: data => action(LOGIN.REQUEST, { data }),
  success: response => action(LOGIN.SUCCESS, { response }),
  failure: error => action(LOGIN.FAILURE, { error }),
}

export const signup = {
  request: data => action(SIGNUP.REQUEST, { data }),
  success: response => action(SIGNUP.SUCCESS, { response }),
  failure: error => action(SIGNUP.FAILURE, { error }),
}

export const logout = () => action(LOGOUT)
export const setToken = token => action(SET_TOKEN, { token })
