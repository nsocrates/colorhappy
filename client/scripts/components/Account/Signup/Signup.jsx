import React, { Component, PropTypes } from 'react'
import s from '../Account.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Close } from 'components/Svg'
import { signup } from 'actions/auth'

const propTypes = {
  location: PropTypes.object.isRequired,
  handleExit: PropTypes.func,
  handleReplace: PropTypes.func,
  dispatch: PropTypes.func,
}

class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleSignup(e) {
    const { dispatch } = this.props
    e.preventDefault()
    dispatch(signup.request({
      email: this._email.value,
      username: this._username.value,
      password: this._password.value,
    }))
  }

  render() {
    const { handleReplace, handleExit } = this.props

    const handleToLogin = handleReplace('/login')

    return (
      <div
        className={s.component}
        onClick={e => e.stopPropagation()}
      >

        <button className={s.closeBtn} onClick={handleExit}>
          <Close className={s.svgClose} />
        </button>

        <section className={s.content}>

          <header className={s.header}>
            <h4>Signup</h4>
          </header>

          <form className={s.form}>
            <input
              className={s.input}
              type="text"
              placeholder="Email"
              ref={c => (this._email = c)}
            />
            <input
              className={s.input}
              type="text"
              placeholder="Username"
              ref={c => (this._username = c)}
            />
            <input
              className={s.input}
              type="password"
              placeholder="Password"
              ref={c => (this._password = c)}
            />
            <input
              className={s.input}
              type="password"
              placeholder="Confirm Password"
              ref={c => (this._passwordConfirm = c)}
            />
            <button className={s.primaryBtn} type="submit">
              Signup
            </button>
          </form>

          <button className={s.secondaryBtn} onClick={handleToLogin}>
            Login
          </button>

        </section>
      </div>
    )
  }
}

Signup.propTypes = propTypes
export default withStyles(s)(Signup)
