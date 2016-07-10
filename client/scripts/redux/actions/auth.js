import { action } from 'utils/action'
import { LOGIN, SIGNUP, LOGOUT, SET_TOKEN } from 'constants/actionTypes'

export const login = {
  request: payload => action(LOGIN.REQUEST, { payload }),
  success: (payload, response) => action(LOGIN.SUCCESS, { payload, response }),
  failure: (payload, error) => action(LOGIN.FAILURE, { payload, error }),
}

export const signup = {
  request: payload => action(SIGNUP.REQUEST, { payload }),
  success: (payload, response) => action(SIGNUP.SUCCESS, { payload, response }),
  failure: (payload, error) => action(SIGNUP.FAILURE, { payload, error }),
}

export const logout = () => action(LOGOUT)
export const setToken = payload => action(SET_TOKEN, { payload })
