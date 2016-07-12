import { createRequestTypes } from 'utils/action'

export const LOGIN = createRequestTypes('LOGIN')
export const SIGNUP = createRequestTypes('SIGNUP')
export const PALETTE = createRequestTypes('PALETTE')
export const PALETTE_ARRAY = createRequestTypes('PALETTE_ARRAY')
export const PALETTE_LOVE = createRequestTypes('PALETTE_LOVE')
export const USER = createRequestTypes('USER')
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE')
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD')
export const DELETE_ACCOUNT = createRequestTypes('DELETE_ACCOUNT')
export const ME = createRequestTypes('ME')

export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const CONDENSE_HEADER = 'CONDENSE_HEADER'
export const CLOSE_ALL = 'CLOSE_ALL'

export const ROUTE_TRANSITION = 'ROUTE_TRANSITION'
