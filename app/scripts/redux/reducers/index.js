import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import session from './session'
import entities from './entities'
import palettes from './palettes'
import ui from './ui'
import notifications from './notifications'
import editor from './editor'
import modal from './modal'
import me from './me'

const rootReducer = combineReducers({
  routing,
  session,
  entities,
  notifications,
  ui,
  editor,
  modal,
  palettes,
  me,
})

export default rootReducer
