/* eslint-disable global-require */

import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from 'reducers'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState, browserHistory) {
  // create the middlewares
  const sagaMiddleware = createSagaMiddleware()
  const routingMiddleware = routerMiddleware(browserHistory)
  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    routingMiddleware,
  )
  // mount them on the Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      createStoreWithMiddleware
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
