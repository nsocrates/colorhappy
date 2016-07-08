import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'

const propTypes = {
  color: PropTypes.string,
}

function BrowserPalette({ color, ...rest }) {
  return (
    <li
      {...rest}
      className={s.paletteColor}
      style={{
        backgroundColor: `#${color}`,
      }}
    />
  )
}

BrowserPalette.propTypes = propTypes

export default withStyles(s)(BrowserPalette)
