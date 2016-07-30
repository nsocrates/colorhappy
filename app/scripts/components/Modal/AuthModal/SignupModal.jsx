import React, { Component, PropTypes } from 'react'
import s from './AuthModal.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Person, Lock, Email, Eye } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import ModalForm from '../Common/ModalForm'

const propTypes = {
  handleReplace: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.getAttribute('data-controller')]: e.target.value,
    })
  }

  handleSubmit(e) {
    const { authenticate } = this.props
    e.preventDefault()
    authenticate(this.state)
  }

  render() {
    const { session, handleReplace, handleExit } = this.props

    const isDisabled = {
      disabled: session.isAuthenticating,
    }

    return (
      <ModalForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onExit={handleExit}
        heading="Signup"
      >
        <FieldInput
          data-controller="email"
          value={this.state.email}
          label="Email"
          type="text"
          Icon={Email}
          hasError={session.errors.field === 'email'}
        />
        <FieldInput
          data-controller="username"
          value={this.state.username}
          label="Username"
          type="text"
          Icon={Person}
          hasError={session.errors.field === 'username'}
        />
        <FieldInput
          data-controller="password"
          value={this.state.password}
          label="Password"
          type="password"
          Icon={Lock}
          RightIcon={Eye}
          hasError={session.errors.field === 'password'}
        />

        <button
          {...isDisabled}
          className={s.formBtn__primary}
          type="submit"
        >
          {session.isAuthenticating ? 'Loading...' : 'Signup'}
        </button>
        <button className={s.formBtn__secondary} onClick={handleReplace}>
          {"Login"}
        </button>
      </ModalForm>
    )
  }
}

Signup.propTypes = propTypes
export default withStyles(s)(Signup)
