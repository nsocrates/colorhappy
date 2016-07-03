import React, { PropTypes } from 'react'
import s from '../Account.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import SvgClose from 'components/Svg/SvgClose'

const propTypes = {
  location: PropTypes.object.isRequired,
  handleExit: PropTypes.func,
  handleReplace: PropTypes.func,
}


function Signup(props) {
  const { handleReplace, handleExit } = props

  const handleToLogin = handleReplace('/login')

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
          <h4>Signup</h4>
        </header>

        <form className={s.form}>
          <input className={s.input} type="text" placeholder="Email" />
          <input className={s.input} type="password" placeholder="Password" />
          <input className={s.input} type="password" placeholder="Confirm Password" />
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

Signup.propTypes = propTypes
export default withStyles(s)(Signup)
