import { createRequestTypes } from 'utils/action'

export const LOGIN = createRequestTypes('LOGIN')
export const SIGNUP = createRequestTypes('SIGNUP')
export const PALETTE = createRequestTypes('PALETTE')
export const PALETTE_ARRAY = createRequestTypes('PALETTE_ARRAY')
export const PALETTE_LOVE = createRequestTypes('PALETTE_LOVE')
export const PALETTE_CREATE = createRequestTypes('PALETTE_CREATE')
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE')
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD')
export const DISABLE_ACCOUNT = createRequestTypes('DISABLE_ACCOUNT')
export const USER = createRequestTypes('USER')
export const ME = createRequestTypes('ME')

export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const CONDENSE_HEADER = 'CONDENSE_HEADER'
export const TOGGLE_TOOLBAR = 'TOGGLE_TOOLBAR'
export const CLOSE_ALL = 'CLOSE_ALL'

export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR'
export const NOTIF_CREATE = 'NOTIF_CREATE'
export const NOTIF_PUBLISH = 'NOTIF_PUBLISH'
export const NOTIF_DESTROY = 'NOTIF_DESTROY'

export const CHANGE_HEX = 'CHANGE_HEX'
export const CHANGE_RGB = 'CHANGE_RGB'
export const CHANGE_HSL = 'CHANGE_HSL'
export const UPDATE_COLOR = 'UPDATE_COLOR'
export const LOAD_COLORS = 'LOAD_COLORS'
export const NEW_PALETTE = 'NEW_PALETTE'

export const ROUTE_TRANSITION = 'ROUTE_TRANSITION'
