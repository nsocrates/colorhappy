import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Modal from 'components/Modal/Modal'
import { push, replace } from 'react-router-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Account.scss'

const propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
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
          retainChildren: true,
          isModal: true,
        },
      }))
    }
  }

  render() {
    const { location } = this.props
    return (
      <Modal handleExit={this.handleExit}>
        <div className={s.container}>
          {location.pathname === '/login'
            ? <Login {...this.props} handleReplace={this.handleReplace} handleExit={this.handleExit} />
            : <Signup {...this.props} handleReplace={this.handleReplace} handleExit={this.handleExit} />
          }
        </div>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return { state }
}

AccountContainer.propTypes = propTypes

const AccountWithStyles = withStyles(s)(AccountContainer)
export default connect(mapStateToProps)(AccountWithStyles)
