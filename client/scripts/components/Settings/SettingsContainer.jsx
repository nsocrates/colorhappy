import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { makeSettingsSelector } from 'reducers/selectors'
// import { me as myProfile } from 'actions/users'
import Loader from 'components/Loader/Loader'
import Settings from './Settings'

// Won't be able to access on refresh

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
}

class SettingsContainer extends Component {
  componentDidMount() {
    // const { dispatch, session, me } = this.props
    // if (session.isAuthenticated && !Object.keys(me).length) {
    //   dispatch(myProfile.request({ id: 'me' }))
    // }
  }

  render() {
    const { me, session } = this.props

    return (
      !session.isAuthenticated || !Object.keys(me).length
        ? <Loader containerStyle={{ paddingTop: '100px' }} />
        : <Settings {...this.props} />
    )
  }
}

SettingsContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makeSettingsSelector()(state, props)

export default connect(makeMapStateToProps)(SettingsContainer)
