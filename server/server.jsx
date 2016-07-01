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

// https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
const serve = (req, res) => {
  const history = createMemoryHistory()
  const store = configureStore({}, history)
  const routes = constructRoutes(store)
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) return res.status(500).send(error.message)
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    if (!renderProps) return res.status(404).send('Not found')
    const css = []
    const InitialView = (
      <StylesContext onInsertCss={styles => css.push(styles._getCss())}>
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      </StylesContext>
    )
    store.runSaga(rootSaga).done.then(() => {
      res.status(200).send(
        layout(
          renderToString(InitialView),
          JSON.stringify(store.getState()),
          css.join('')
        )
      )
    }).catch((err) => {
      res.status(500).send(err.message)
    })

    renderToString(InitialView)
    return store.close()
  })
}

export default serve
