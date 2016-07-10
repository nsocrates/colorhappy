import { action } from 'utils/action'
import { ROUTE_TRANSITION } from 'constants/actionTypes'

export const routeTransition = payload => action(ROUTE_TRANSITION, { payload })
