import React, { Component, PropTypes } from 'react'
import s from './Sidebar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'
import { logout } from 'actions/auth'
import { toggleSidebar } from 'actions/ui'

const propTypes = {
  sidebar: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  header: PropTypes.bool.isRequired,
}

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.sidebar !== nextProps.sidebar
  }

  componentDidUpdate() {
    const { sidebar } = this.props
    if (sidebar) this._sidebar.focus()
    else this._sidebar.blur()
  }

  handleKeyDown(e) {
    const { dispatch } = this.props
    if (e.key === 'Escape' || e.keycode === 27) {
      e.preventDefault()
      dispatch(toggleSidebar(false))
    }
    e.preventDefault()
  }

  render() {
    const { sidebar, header, dispatch } = this.props
    return (
      <aside
        className={s.sidebar}
        onKeyDown={this.handleKeyDown}
        tabIndex="-1"
        ref={c => (this._sidebar = c)}
        style={{
          transform: sidebar && 'translate3d(0, 0, 0)',
          top: header && '4.6875em',
        }}
      >
        <nav className={s.sidebarNav}>
          <Link className={s.sidebarLink} to="/">
            <h1 className={s.sidebarHeading}>{"Home"}</h1>
          </Link>
          <Link className={s.sidebarLink} to="/palettes">
            <h1 className={s.sidebarHeading}>{"Palettes"}</h1>
          </Link>
          <Link className={s.sidebarLink} to="/editor">
            <h1 className={s.sidebarHeading}>{"Editor"}</h1>
          </Link>
          <Link className={s.sidebarLink} to="/settings">
            <h1 className={s.sidebarHeading}>{"Settings"}</h1>
          </Link>
          <label className={s.sidebarLink} onClick={() => dispatch(logout())}>
            <h1 className={s.sidebarHeading}>{"Logout"}</h1>
          </label>
        </nav>
      </aside>
    )
  }
}

Sidebar.propTypes = propTypes

export default withStyles(s)(Sidebar)
