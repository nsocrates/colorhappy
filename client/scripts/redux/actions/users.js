import { USER, ME } from 'constants/actionTypes'
import { action } from 'utils/action'

export const user = {
  request: payload => action(USER.REQUEST, { payload }),
  success: (payload, response) => action(USER.SUCCESS, { payload, response }),
  failure: (payload, error) => action(USER.FAILURE, { payload, error }),
}

export const me = {
  request: () => action(ME.REQUEST, { payload: { id: 'me' } }),
  success: (payload, response) => action(ME.SUCCESS, { payload, response }),
  failure: (payload, error) => action(ME.FAILURE, { payload, error }),
}
