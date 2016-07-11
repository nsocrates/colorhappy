import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import session from './session'
import entities from './entities'
import palettes from './palettes'
import ui from './ui'

const rootReducer = combineReducers({
  routing,
  session,
  entities,
  palettes,
  ui,
})

export default rootReducer
