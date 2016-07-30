import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import session from './session'
import entities from './entities'
import palettes from './palettes'
import ui from './ui'
import notifications from './notifications'
import editor from './editor'
import modal from './modal'

const rootReducer = combineReducers({
  routing,
  session,
  entities,
  notifications,
  ui,
  editor,
  modal,
  palettes,
})

export default rootReducer
