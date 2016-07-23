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
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(e) {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(login.request({
      username: this._username.value,
      password: this._password.value,
    }))
  }

  render() {
    const { handleReplace, handleExit } = this.props

    const handleToSignup = handleReplace('/signup')

    return (
      <ModalForm onExit={handleExit} onSubmit={this.handleLogin} heading="Login">
        <FieldInput
          label="Email or Username"
          type="text"
          reference={c => (this._username = c)}
          Icon={Person}
          defaultValue="seed"
        />
        <FieldInput
          label="Password"
          type="password"
          reference={c => (this._password = c)}
          Icon={Lock}
          defaultValue="123"
        />
        <button className={s.primaryBtn} type="submit">
          {"Login"}
        </button>
        <button className={s.secondaryBtn} onClick={handleToSignup}>
          {"Signup"}
        </button>
      </ModalForm>
    )
  }
}

Login.propTypes = propTypes
export default withStyles(s)(Login)
