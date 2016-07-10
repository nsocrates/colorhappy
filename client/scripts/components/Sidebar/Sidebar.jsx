import React, { PropTypes } from 'react'
import s from './Sidebar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'
import { logout } from 'actions/auth'

const propTypes = {
  sidebar: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  header: PropTypes.bool.isRequired,
}

function Sidebar(props) {
  const { sidebar, header, dispatch } = props
  return (
    <aside
      className={s.sidebar}
      style={{
        transform: sidebar && 'translate3d(0, 0, 0)',
        top: header && '4.6875em',
      }}
    >
      <nav className={s.sidebarNav}>
        <Link className={s.sidebarLink} to="/">
          <h1 className={s.sidebarHeading}>{"Home"}</h1>
        </Link>
        <Link className={s.sidebarLink} to="/">
          <h1 className={s.sidebarHeading}>{"Palettes"}</h1>
        </Link>
        <Link className={s.sidebarLink} to="/">
          <h1 className={s.sidebarHeading}>{"Account"}</h1>
        </Link>
        <Link className={s.sidebarLink} to="/" onClick={() => dispatch(logout())}>
          <h1 className={s.sidebarHeading}>{"Logout"}</h1>
        </Link>
      </nav>
    </aside>
  )
}

Sidebar.propTypes = propTypes

export default withStyles(s)(Sidebar)
