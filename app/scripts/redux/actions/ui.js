import {
  TOGGLE_SIDEBAR,
  CLOSE_ALL,
  CONDENSE_HEADER,
  TOGGLE_SNACKBAR,
} from 'constants/actionTypes'

import { action } from 'utils/action'

export const closeAll = () => action(CLOSE_ALL)
export const toggleSidebar = shouldOpen => action(TOGGLE_SIDEBAR, { shouldOpen })
export const condenseHeader = shouldCondense => action(CONDENSE_HEADER, { shouldCondense })
export const toggleSnackbar = payload => action(TOGGLE_SNACKBAR, { payload })
