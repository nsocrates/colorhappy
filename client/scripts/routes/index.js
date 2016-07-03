import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from 'components/Home/Home'
import App from 'components/App/App'
import AccountContainer from 'components/Account/AccountContainer'

export default function constructRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={AccountContainer} />
      <Route path="/signup" component={AccountContainer} />
    </Route>
  )
}
