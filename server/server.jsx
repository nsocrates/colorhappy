// https://github.com/yelouafi/redux-saga/blob/master/examples/real-world/server.js

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from 'store'
import rootSaga from 'sagas'
import { match, createMemoryHistory, RouterContext } from 'react-router'
import constructRoutes from 'routes'
import React from 'react'
import StylesContext from 'components/StylesContext/StylesContext'
import layout from './layout'

const handleNotFound = res => res.status(404).end()

const handleError = (res, statusCode = 500) => error =>
  res.status(statusCode).send(error)

const handleRedirect = res => location =>
  res.redirect(302, location.pathname + location.search)

const renderView = res => (InitialView, store, css) =>
  res.status(200).send(
    layout(
      renderToString(InitialView),
      JSON.stringify(store.getState()),
      css.join('')
    )
  )

// https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
const serve = (req, res) => {
  const history = createMemoryHistory()
  const store = configureStore({/* initialState */}, history)
  const routes = constructRoutes(store)
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) return handleError(res)(error)
    if (redirectLocation) return handleRedirect(res)(redirectLocation)
    if (!renderProps) return handleNotFound(res)
    const css = []
    const InitialView = (
      <StylesContext onInsertCss={styles => css.push(styles._getCss())}>
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      </StylesContext>
    )
    store.runSaga(rootSaga).done
      .then(renderView(res)(InitialView, store, css))
      .catch(handleError(res))

    renderToString(InitialView)
    return store.close()
  })
}

export default serve
