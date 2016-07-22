import React, { PropTypes } from 'react'
import s from './PaletteBar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'

const propTypes = {
  children: PropTypes.node,
  Icon: PropTypes.func,
  label: PropTypes.string,
  anchor: PropTypes.bool,
}

function BarItem(props) {
  const { Icon, label, anchor, ...rest } = props
  const Tag = anchor ? 'a' : Link
  return (
    <li className={s.barItem}>
      <Tag
        {...rest}
        className={s.barAction}
      >
        <Icon className={s.barIcon} />
        <span className={s.barText}>
          {label}
        </span>
      </Tag>
    </li>
  )
}

BarItem.propTypes = propTypes

BarItem.propTypes = propTypes
export default withStyles(s)(BarItem)
