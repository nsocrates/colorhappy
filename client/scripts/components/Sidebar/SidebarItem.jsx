import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sidebar.scss'
import { Link } from 'react-router'

const propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Tag: PropTypes.string,
}

function SidebarItem({ Tag = Link, label, ...rest }) {
  return (
    <li className={s.navItem}>
      <Tag
        {...rest}
        className={s.navLink}
      >
        {label}
      </Tag>
    </li>
  )
}

SidebarItem.propTypes = propTypes

export default withStyles(s)(SidebarItem)
