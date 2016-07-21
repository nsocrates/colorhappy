import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sidebar.scss'
import { Link } from 'react-router'

const propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

function SidebarItem({ to, label, ...rest }) {
  return (
    <li className={s.navItem}>
      <Link
        {...rest}
        className={s.navLink}
        to={to}
      >
        {label}
      </Link>
    </li>
  )
}

SidebarItem.propTypes = propTypes

export default withStyles(s)(SidebarItem)
