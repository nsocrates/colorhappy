import { action } from 'utils/action'
import { LOGIN, SIGNUP, LOGOUT, SET_TOKEN } from 'constants/actionTypes'

export const login = {
  request: payload => action(LOGIN.REQUEST, { payload }),
  success: response => action(LOGIN.SUCCESS, { response }),
  failure: error => action(LOGIN.FAILURE, { error }),
}

export const signup = {
  request: payload => action(SIGNUP.REQUEST, { payload }),
  success: response => action(SIGNUP.SUCCESS, { response }),
  failure: error => action(SIGNUP.FAILURE, { error }),
}

export const logout = () => action(LOGOUT)
export const setToken = payload => action(SET_TOKEN, { payload })
