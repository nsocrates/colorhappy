import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { makeSettingsSelector } from 'reducers/selectors'
import Loader from 'components/Loader/Loader'
import Settings from './Settings'

// Won't be able to access on refresh

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
}

function SettingsContainer(props) {
  const { session, me } = props
  return (
    !session.isAuthenticated || !Object.keys(me).length
      ? <Loader containerStyle={{ paddingTop: '100px' }} />
      : <Settings {...props} />
  )
}

SettingsContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makeSettingsSelector()(state, props)

export default connect(makeMapStateToProps)(SettingsContainer)
