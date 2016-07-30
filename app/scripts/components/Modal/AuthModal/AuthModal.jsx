import React, { PropTypes } from 'react'
import Modal from '../Modal'
import { modal } from 'actions/modal'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import { login, signup, clearErrors as destroyErrors } from 'actions/auth'
import s from './AuthModal.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const COMPONENTS = {
  LOGIN: LoginModal,
  SIGNUP: SignupModal,
}

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  modalComponent: PropTypes.string.isRequired,
}

function AuthModal(props) {
  const { dispatch, session, modalComponent } = props
  const isLoginComponent = modalComponent === 'LOGIN'

  function handleExit(e) {
    e.preventDefault()
    dispatch(modal.hide())
  }

  function handleReplace(e) {
    // AdjacentComponent is LOGIN if rendred component is SIGNUP; vice versa
    const adjacentComponent = isLoginComponent ? 'SIGNUP' : 'LOGIN'
    e.preventDefault()
    dispatch(modal.show({
      modalComponent: adjacentComponent,
      modalProps: {
        session,
      },
    }))
  }

  function authenticate(payload) {
    // Get corresponding action for component
    const action = isLoginComponent ? login : signup
    dispatch(action.request(payload))
  }

  function clearErrors() {
    dispatch(destroyErrors())
  }

  const Component = COMPONENTS[modalComponent]

  return (
    <Modal handleExit={handleExit} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <div className={s.container}>
        <Component
          session={session}
          handleExit={handleExit}
          handleReplace={handleReplace}
          authenticate={authenticate}
          clearErrors={clearErrors}
        />
      </div>
    </Modal>
  )
}

AuthModal.propTypes = propTypes
export default withStyles(s)(AuthModal)
