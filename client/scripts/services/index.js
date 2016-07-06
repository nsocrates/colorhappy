import { browserHistory } from 'react-router'

export * as api from './api'
export const to = location => browserHistory.push(location)
export const replace = location => browserHistory.replace(location)
