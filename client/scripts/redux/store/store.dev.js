/* eslint-disable global-require */

import { applyMiddleware, compose, createStore } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from 'reducers'

export default function configureStore(initialState) {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()
  const loggerMiddleware = createLogger()
  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    loggerMiddleware
  )
  // mount it on the Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      createStoreWithMiddleware
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
