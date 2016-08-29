import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './App.scss'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import Footer from 'components/Footer/Footer'
import Snackbar from 'components/Snackbar/Snackbar'
import { RootModal } from 'components/Modal'
import { appSelector } from 'reducers/selectors'
import { toggleSidebar } from 'actions/ui'
import { setToken } from 'actions/auth'
import { replace } from 'react-router-redux'

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('TOKEN')
    if (token) {
      this.props.dispatch(setToken({ token }))
      this.props.dispatch(replace('/palettes'))
    }
  }

  render() {
    const {
      children,
      location,
      session,
      dispatch,
      sidebar,
      header,
      notifications,
    } = this.props

    return (
      <div className={s.app}>
        <Header
          location={location}
          session={session}
          dispatch={dispatch}
          ui={{ header, sidebar }}
        />
        <Sidebar
          sidebar={sidebar}
          header={header}
          dispatch={dispatch}
          session={session}
        />
        <section className={s.contentWrap} style={{ opacity: sidebar && '0.65' }}>
          {children}
        </section>
        <Footer />
        <RootModal />
        <div
          className={s.sidebarOverlay}
          style={{ display: sidebar && 'block' }}
          onClick={() => dispatch(toggleSidebar())}
        />
        <Snackbar dispatch={dispatch} notifications={notifications} />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  sidebar: PropTypes.bool.isRequired,
  header: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
}

const AppWithStyles = withStyles(s)(App)
export default connect(appSelector)(AppWithStyles)
