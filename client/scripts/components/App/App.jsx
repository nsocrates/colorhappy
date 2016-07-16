import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './App.scss'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import Footer from 'components/Footer/Footer'
import ModalHOC from 'components/Modal/ModalHOC'
import Snackbar from 'components/Snackbar/Snackbar'
import { appSelector } from 'reducers/selectors'
import { toggleSidebar } from 'actions/ui'
import { setToken } from 'actions/auth'

class App extends React.Component {
  static oldChildren = this
  componentDidMount() {
    const token = localStorage.getItem('TOKEN')
    if (token) this.props.dispatch(setToken({ token }))
  }

  componentWillUnmount() {
    // ...
  }

  render() {
    const {
      prevOrCurrChildren,
      modalChildren,
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
        <Sidebar sidebar={sidebar} header={header} dispatch={dispatch} />
        <section className={s.contentWrap} style={{ opacity: sidebar && '0.65' }}>
          {prevOrCurrChildren}
          {modalChildren}
        </section>
        <Footer />
        <Snackbar dispatch={dispatch} notifications={notifications} />
        <div
          className={s.sidebarOverlay}
          style={{ display: sidebar && 'block' }}
          onClick={() => dispatch(toggleSidebar())}
        />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  prevOrCurrChildren: PropTypes.node.isRequired,
  modalChildren: PropTypes.node.isRequired,
  session: PropTypes.object.isRequired,
  sidebar: PropTypes.bool.isRequired,
  header: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
}

const AppModal = ModalHOC(App)
const AppWithStyles = withStyles(s)(AppModal)
export default connect(appSelector)(AppWithStyles)
