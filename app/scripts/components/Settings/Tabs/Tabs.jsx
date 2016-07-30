import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Tabs.scss'

const propTypes = {
  location: PropTypes.object.isRequired,
}

function Tabs(props) {
  function manageActiveClassNames(anchor) {
    let className = s.tabItem
    const activeHash = props.location.hash || '#profile'

    switch (activeHash) {
      case anchor:
        className = s.tabItem__active
        return className
      case '#profile':
        if (anchor === '#account') className = s.tabItem__rmLeft
        return className
      case '#account':
        if (anchor === '#profile') className = s.tabItem__rmRight
        if (anchor === '#password') className = s.tabItem__rmLeft
        return className
      case '#password':
        if (anchor === '#account') className = s.tabItem__rmRight
        return className
      default:
        return className
    }
  }

  return (
    <ul className={s.tabList}>

      <li className={manageActiveClassNames('#profile')}>
        <Link className={s.tabLink} to="/settings#profile">
          {"Profile"}
        </Link>
      </li>

      <li className={manageActiveClassNames('#account')}>
        <Link className={s.tabLink} to="/settings#account">
          {"Account"}
        </Link>
      </li>

      <li className={manageActiveClassNames('#password')}>
        <Link className={s.tabLink} to="/settings#password">
          {"Password"}
        </Link>
      </li>
    </ul>
  )
}

Tabs.propTypes = propTypes
export default withStyles(s)(Tabs)
