import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from 'components/Home/Home'
import App from 'components/App/App'

export default function constructRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  )
}
