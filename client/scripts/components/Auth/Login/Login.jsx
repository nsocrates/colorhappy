import React, { Component, PropTypes } from 'react'
import s from '../Auth.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Close } from 'components/Svg'
import { login } from 'actions/auth'

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
      <div className={s.component}>

        <header className={s.header} onClick={e => e.stopPropagation()}>
          <h4 className={s.formTitle}>
            {"Login"}
          </h4>
          <div className={s.btnWrap}>
            <button className={s.closeBtn} onClick={handleExit}>
              <Close className={s.svgClose} />
            </button>
          </div>
        </header>

        <article className={s.content} onClick={e => e.stopPropagation()}>

          <form className={s.form} onSubmit={this.handleLogin}>
            <input
              className={s.input}
              type="text"
              placeholder="Email or Username"
              ref={c => (this._username = c)}
            />
            <input
              className={s.input}
              type="password"
              placeholder="Password"
              ref={c => (this._password = c)}
            />
            <button className={s.primaryBtn} type="submit">
              {"Login"}
            </button>
          </form>

          <button className={s.secondaryBtn} onClick={handleToSignup}>
            {"Signup"}
          </button>

        </article>
      </div>
    )
  }
}

Login.propTypes = propTypes
export default withStyles(s)(Login)
