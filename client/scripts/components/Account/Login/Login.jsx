import React, { PropTypes } from 'react'
import s from '../Account.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import SvgClose from 'components/Svg/SvgClose'

const propTypes = {
  handleReplace: PropTypes.func,
  handleExit: PropTypes.func,
}

function Login(props) {
  const { handleReplace, handleExit } = props

  const handleToSignup = handleReplace('/signup')

  return (
    <div
      className={s.component}
      onClick={e => e.stopPropagation()}
    >

      <button className={s.closeBtn} onClick={handleExit}>
        <SvgClose className={s.svgClose} />
      </button>

      <section className={s.content}>

        <header className={s.header}>
          <h4>Login</h4>
        </header>

        <form className={s.form}>
          <input className={s.input} type="text" placeholder="Email" />
          <input className={s.input} type="password" placeholder="Password" />
          <button className={s.primaryBtn} type="submit">
            Login
          </button>
        </form>

        <button className={s.secondaryBtn} onClick={handleToSignup}>
          Signup
        </button>

      </section>
    </div>
  )
}

Login.propTypes = propTypes
export default withStyles(s)(Login)
