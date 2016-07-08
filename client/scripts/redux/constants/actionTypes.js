import { createRequestTypes } from 'utils/action'

export const LOGIN = createRequestTypes('LOGIN')
export const SIGNUP = createRequestTypes('SIGNUP')
export const PALETTE = createRequestTypes('PALETTE')
export const PALETTE_ARRAY = createRequestTypes('PALETTE_ARRAY')

export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'
