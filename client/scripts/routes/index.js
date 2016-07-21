import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from 'components/Home/Home'
import App from 'components/App/App'
import AuthContainer from 'components/Auth/AuthContainer'
import PaletteContainer from 'components/Palette/PaletteContainer'
import BrowserContainer from 'components/Browser/BrowserContainer'
import SettingsContainer from 'components/Settings/SettingsContainer'
import EditorContainer from 'components/Editor/EditorContainer'

export default function constructRoutes(store) {
  function handleAuth(nextState, replace, cb) {
    const { session } = store.getState()
    if (!session.isAuthenticated) {
      replace({
        pathName: '/',
        state: { nextPathname: nextState.location.pathname },
      })
    }
    cb()
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={AuthContainer} />
      <Route path="/signup" component={AuthContainer} />
      <Route path="/settings" component={SettingsContainer} onEnter={handleAuth} />
      <Route path="/palettes" component={BrowserContainer} />
      <Route path="/palette(/:id)" component={PaletteContainer} />
      <Route path="/editor(/:hex)" component={EditorContainer} />
    </Route>
  )
}
