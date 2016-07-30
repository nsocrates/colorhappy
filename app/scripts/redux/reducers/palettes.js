import paginate from 'utils/paginate'
import { combineReducers } from 'redux'
import { PALETTE_ARRAY, USER_PALETTE } from 'constants/actionTypes'

export const palettes = combineReducers({
  palettesBySortOrder: paginate({
    mapActionToKey: action => action.options.sort,
    types: Object.values(PALETTE_ARRAY),
  }),
  palettesByUser: paginate({
    mapActionToKey: action => action.payload.id,
    types: Object.values(USER_PALETTE),
  }),
})

export default palettes
