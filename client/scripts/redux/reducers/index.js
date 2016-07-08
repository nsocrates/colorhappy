import { combineReducers } from 'redux'

import session from './session'
import entities from './entities'

const rootReducer = combineReducers({
  session,
  entities,
})

export default rootReducer
