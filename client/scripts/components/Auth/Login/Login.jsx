import React, { Component, PropTypes } from 'react'
import s from '../Auth.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Person, Lock } from 'components/Svg'
import { login } from 'actions/auth'
import FieldInput from 'components/Form/FieldInput'
import { ModalForm } from 'components/Modal'

const propTypes = {
  handleReplace: PropTypes.func,
  handleExit: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'seed',
      password: '123',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(login.request({
      username: this.state.username,
      password: this.state.password,
    }))
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.getAttribute('data-controller')]: e.target.value,
    })
  }

  render() {
    const { handleReplace, handleExit, session } = this.props
    const handleToSignup = handleReplace('/signup')

    const isDisabled = {
      disabled: session.isAuthenticating,
    }

    return (
      <ModalForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onExit={handleExit}
        heading="Login"
      >
        <FieldInput
          data-controller="username"
          label="Email or Username"
          type="text"
          value={this.state.username}
          Icon={Person}
        />
        <FieldInput
          data-controller="password"
          label="Password"
          type="password"
          value={this.state.password}
          Icon={Lock}
        />
        <button
          {...isDisabled}
          className={s.formBtn__primary}
          type="submit"
        >
          {session.isAuthenticating ? 'Logging in...' : 'Login'}
        </button>
        <button className={s.formBtn__secondary} onClick={handleToSignup}>
          {"Signup"}
        </button>
      </ModalForm>
    )
  }
}

Login.propTypes = propTypes
export default withStyles(s)(Login)
