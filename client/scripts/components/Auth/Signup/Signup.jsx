import React, { Component, PropTypes } from 'react'
import s from '../Auth.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { signup } from 'actions/auth'
import { Close, Person, Lock, Email, Eye } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'

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
      <div className={s.component}>

        <header className={s.header} onClick={e => e.stopPropagation()}>
          <h4 className={s.formTitle}>
            {"Signup"}
          </h4>
          <div className={s.btnWrap}>
            <button className={s.closeBtn} onClick={handleExit}>
              <Close className={s.svgClose} />
            </button>
          </div>
        </header>

        <article className={s.content} onClick={e => e.stopPropagation()}>

          <form className={s.form} onSubmit={this.handleSignup}>
            <FieldInput
              label="Email"
              type="text"
              reference={c => (this._email = c)}
              Icon={Email}
            />
            <FieldInput
              label="Username"
              type="text"
              reference={c => (this._username = c)}
              Icon={Person}
            />
            <FieldInput
              label="Password"
              type="password"
              reference={c => (this._password = c)}
              Icon={Lock}
              RightIcon={Eye}
            />

            <button className={s.primaryBtn} type="submit">
              {"Signup"}
            </button>
          </form>

          <button className={s.secondaryBtn} onClick={handleToLogin}>
            {"Login"}
          </button>

        </article>
      </div>
    )
  }
}

Signup.propTypes = propTypes
export default withStyles(s)(Signup)
