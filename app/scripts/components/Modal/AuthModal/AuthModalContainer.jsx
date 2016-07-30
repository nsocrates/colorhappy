import React from 'react'
import { connect } from 'react-redux'
import AuthModal from './AuthModal'
import { sessionSelector } from 'reducers/selectors'

// We need to connect this component with State in order to receive updates from our
// session reducer.
function AuthModalContainer(props) {
  return (
    <AuthModal {...props} />
  )
}

const mapStateToProps = state => sessionSelector(state)

export default connect(mapStateToProps)(AuthModalContainer)
