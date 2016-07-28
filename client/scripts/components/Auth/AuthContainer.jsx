import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Modal from 'components/Modal/Modal'
import { push, replace } from 'react-router-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Auth.scss'
import { sessionSelector } from 'reducers/selectors'

const propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
}

class AccountContainer extends Component {
  constructor(props) {
    super(props)
    this.handleExit = this.handleExit.bind(this)
    this.handleReplace = this.handleReplace.bind(this)
  }

  getValidReturnPath(location) {
    return location.state && location.state.returnPath
      ? location.state.returnPath
      : '/'
  }

  handleExit() {
    const { location, dispatch } = this.props
    dispatch(push({
      pathname: this.getValidReturnPath(location),
      state: {
        isReturnPath: true,
      },
    }))
  }

  handleReplace(pathname) {
    return e => {
      e.preventDefault()
      this.props.dispatch(replace({
        pathname,
        state: {
          returnPath: this.getValidReturnPath(this.props.location),
          isModal: true,
        },
      }))
    }
  }

  render() {
    const { location } = this.props
    const AccountComponent = location.pathname === '/login' ? Login : Signup
    return (
      <Modal handleExit={this.handleExit} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <div className={s.container}>
          <AccountComponent
            {...this.props}
            handleReplace={this.handleReplace}
            handleExit={this.handleExit}
          />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => sessionSelector(state)

AccountContainer.propTypes = propTypes

const AccountWithStyles = withStyles(s)(AccountContainer)
export default connect(mapStateToProps)(AccountWithStyles)
