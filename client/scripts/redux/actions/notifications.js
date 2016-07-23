import { NOTIF_PUBLISH, NOTIF_DESTROY, NOTIF_CREATE } from 'constants/actionTypes'
import { action } from 'utils/action'

/**
 * Notification action creator.
 * Accepts an object containing properties of
 * id, message, action, and duration.
 * Everything has a default value except for message.
 */
export const notif = {
  create: payload => action(NOTIF_CREATE, { payload }),
  // notif.publish is to be used by our Sagas.
  publish: payload => action(NOTIF_PUBLISH, { payload }),
  destroy: payload => action(NOTIF_DESTROY, { payload }),
}
