import React, { Component, PropTypes } from 'react'
import s from './Sidebar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import SidebarItem from './SidebarItem'
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
    this.handleLogout = this.handleLogout.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.sidebar !== nextProps.sidebar
  }

  componentDidUpdate() {
    const { sidebar } = this.props
    if (sidebar) this._sidebar.focus()
    else this._sidebar.blur()
  }

  handleClose() {
    const { dispatch } = this.props
    dispatch(toggleSidebar(false))
  }

  handleKeyDown(e) {
    e.preventDefault()
    if (e.key === 'Escape' || e.keycode === 27) {
      this.handleClose()
    }
  }

  handleLogout() {
    const { dispatch } = this.props
    dispatch(logout())
    this.handleClose()
  }

  render() {
    const { sidebar, header } = this.props
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
        <ul className={s.navList}>
          <SidebarItem to={"/"} label={"Home"} />
          <SidebarItem to={"/palettes"} label={"Palettes"} />
          <SidebarItem to={"/editor"} label={"Editor"} />
          <SidebarItem to={"/settings"} label={"Settings"} />
          <SidebarItem to={"/"} label={"Logout"} onClick={this.handleLogout} />
        </ul>
      </aside>
    )
  }
}

Sidebar.propTypes = propTypes

export default withStyles(s)(Sidebar)
