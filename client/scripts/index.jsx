/* eslint-disable global-require */

import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'store'
import rootSaga from 'sagas'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import Root from 'components/Root'

const rootElement = document.getElementById('root')
const serverStyles = document.getElementById('serverStyles')
serverStyles.parentNode.removeChild(serverStyles);

const store = configureStore(window.__INITIAL_STATE__)
const history = browserHistory

store.runSaga(rootSaga)

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      rootElement
    )
  })
}
