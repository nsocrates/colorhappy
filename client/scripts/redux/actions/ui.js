import {
  TOGGLE_SIDEBAR,
  CLOSE_ALL,
  CONDENSE_HEADER,
  SHOW_MODAL,
  HIDE_MODAL,
} from 'constants/actionTypes'

import { action } from 'utils/action'

export const toggleSidebar = shouldOpen => action(TOGGLE_SIDEBAR, { shouldOpen })
export const closeAll = () => action(CLOSE_ALL)
export const condenseHeader = shouldCondense => action(CONDENSE_HEADER, { shouldCondense })

// May not need this..
export const toggleModal = {
  on: payload => action(SHOW_MODAL, { payload }),
  off: () => action(HIDE_MODAL),
}
