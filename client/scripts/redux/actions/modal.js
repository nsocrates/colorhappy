import { SHOW_MODAL, HIDE_MODAL } from 'constants/actionTypes'
import { action } from 'utils/action'

export const modal = {
  /**
   * An action creator to toggle modal on and off
   * @param  {Object} payload - A payload of information sent to the Store
   * @param {String} [payload.modalComponent] - The name of the React Modal Component
   * @param {Object} [payload.modalProps] - Props we send to our Component
   * @return {Object} - An action
   */
  show: payload => action(SHOW_MODAL, { payload }),
  hide: () => action(HIDE_MODAL),
}
