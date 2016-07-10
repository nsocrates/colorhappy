import { createRequestTypes } from 'utils/action'

export const LOGIN = createRequestTypes('LOGIN')
export const SIGNUP = createRequestTypes('SIGNUP')
export const PALETTE = createRequestTypes('PALETTE')
export const PALETTE_ARRAY = createRequestTypes('PALETTE_ARRAY')
export const PALETTE_LOVE = createRequestTypes('PALETTE_LOVE')

export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const CONDENSE_HEADER = 'CONDENSE_HEADER'
export const CLOSE_ALL = 'CLOSE_ALL'
export const ROUTE_TRANSITION = 'ROUTE_TRANSITION'
