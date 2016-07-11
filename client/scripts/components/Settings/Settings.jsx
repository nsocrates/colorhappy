import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Settings.scss'
import { Link } from 'react-router'

const propTypes = {
  session: PropTypes.object,
  me: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
}

function Settings(props) {
  const { location } = props
  const { hash } = location

  function manageActiveClassNames(anchor) {
    let className = s.tabItem
    switch (hash) {
      case anchor:
        className = s.tabItem__active
        return className
      case '#account':
        if (anchor === '#password') className = s.tabItem__rmLeft
        return className
      case '#password':
        if (anchor === '#account') className = s.tabItem__rmRight
        if (anchor === '#profile') className = s.tabItem__rmLeft
        return className
      case '#profile':
        if (anchor === '#password') className = s.tabItem__rmRight
        return className
      default:
        return className
    }
  }

  return (
    <main className={s.container}>

      <heading className={s.pageHeading}>
        <h2 className={s.pageHeader}>
          {"Settings"}
        </h2>
      </heading>

      <ul className={s.tabList}>
        <li className={manageActiveClassNames('#account')}>
          <Link className={s.tabLink} to="#account">
            {"Account"}
          </Link>
        </li>

        <li className={manageActiveClassNames('#password')}>
          <Link className={s.tabLink} to="#password">
            {"Password"}
          </Link>
        </li>

        <li className={manageActiveClassNames('#profile')}>
          <Link className={s.tabLink} to="#profile">
            {"Profile"}
          </Link>
        </li>
      </ul>
      <hr className={s.hr} />

      <div className={s.innerContainer}>
      </div>
    </main>
  )
}

Settings.propTypes = propTypes

export default withStyles(s)(Settings)
