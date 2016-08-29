import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App/App'
import PaletteContainer from 'components/Palette/PaletteContainer'
import BrowserContainer from 'components/Browser/BrowserContainer'
import BrowserFavoriteContainer from 'components/Browser/BrowserFavoriteContainer'
import SettingsContainer from 'components/Settings/SettingsContainer'
import EditorContainer from 'components/Editor/EditorContainer'
import ProfileContainer from 'components/Profile/ProfileContainer'
import LandingPage from 'components/LandingPage/LandingPage'

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
      <IndexRoute component={LandingPage} />
      <Route path="/palettes" component={BrowserContainer} />
      <Route path="/palette(/:id)" component={PaletteContainer} />
      <Route path="/editor(/:hex)" component={EditorContainer} />
      <Route path="/user/:id" component={ProfileContainer} />
      <Route path="/settings" component={SettingsContainer} onEnter={handleAuth} />
      <Route path="/favorites" component={BrowserFavoriteContainer} onEnter={handleAuth} />
    </Route>
  )
}
