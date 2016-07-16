import { NOTIF_PUBLISH, NOTIF_DESTROY, NOTIF_CREATE } from 'constants/actionTypes'
import { action } from 'utils/action'

// Payload
/*
  message,
  action,
  id,
  kind, ?
  duration,
*/

export const notif = {
  create: payload => action(NOTIF_CREATE, { payload }),
  publish: payload => action(NOTIF_PUBLISH, { payload }),
  destroy: payload => action(NOTIF_DESTROY, { payload }),
}
