import React, { Component, PropTypes } from 'react'
import s from '../Auth.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { signup } from 'actions/auth'
import { Person, Lock, Email, Eye } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import { ModalForm } from 'components/Modal'

const propTypes = {
  location: PropTypes.object.isRequired,
  handleExit: PropTypes.func,
  handleReplace: PropTypes.func,
  dispatch: PropTypes.func,
  session: PropTypes.object,
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

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.getAttribute('data-controller')]: e.target.value,
    })
  }

  handleSubmit(e) {
    const { dispatch } = this.props
    e.preventDefault()
    dispatch(signup.request(this.state))
  }

  render() {
    const { handleReplace, handleExit, session } = this.props

    const handleToLogin = handleReplace('/login')

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
        />
        <FieldInput
          data-controller="username"
          value={this.state.username}
          label="Username"
          type="text"
          Icon={Person}
        />
        <FieldInput
          data-controller="password"
          value={this.state.password}
          label="Password"
          type="password"
          Icon={Lock}
          RightIcon={Eye}
        />

        <button
          {...isDisabled}
          className={s.formBtn__primary}
          type="submit"
        >
          {session.isAuthenticating ? 'Loading...' : 'Signup'}
        </button>
        <button className={s.formBtn__secondary} onClick={handleToLogin}>
          {"Login"}
        </button>
      </ModalForm>
    )
  }
}

Signup.propTypes = propTypes
export default withStyles(s)(Signup)
