import * as _api from './api'
import { browserHistory } from 'react-router'

export const api = _api
export const to = location => browserHistory.push(location)
export const replace = location => browserHistory.replace(location)
