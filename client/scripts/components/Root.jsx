import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import constructRoutes from 'routes'
import { Router } from 'react-router'
import StylesContext from 'components/StylesContext/StylesContext'

const propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const Root = ({ store, history }) => {
  const routes = constructRoutes(store)
  return (
    <StylesContext onInsertCss={styles => styles._insertCss()}>
      <Provider store={store}>
        <Router routes={routes} history={history} />
      </Provider>
    </StylesContext>
  )
}

Root.propTypes = propTypes

export default Root
