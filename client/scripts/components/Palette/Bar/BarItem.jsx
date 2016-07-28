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
    <article className={s.column}>
      <Tag
        {...rest}
        className={s.anchor}
      >
        <Icon className={s.icon} />
        <span className={s.text}>
          {label}
        </span>
      </Tag>
    </article>
  )
}

BarItem.propTypes = propTypes

BarItem.propTypes = propTypes
export default withStyles(s)(BarItem)
