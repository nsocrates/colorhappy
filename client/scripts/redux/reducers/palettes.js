import paginate from 'utils/paginate'
import { combineReducers } from 'redux'
import { PALETTE_ARRAY } from 'constants/actionTypes'

const palettes = combineReducers({
  newest: paginate({
    types: [PALETTE_ARRAY.REQUEST, PALETTE_ARRAY.SUCCESS, PALETTE_ARRAY.FAILURE],
    hasSortOption: action =>
      action.options && action.options.sort && action.options.sort === '-createdAt',
  }),
})

export default palettes
