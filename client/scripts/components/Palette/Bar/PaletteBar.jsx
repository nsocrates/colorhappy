import React, { PropTypes } from 'react'
import s from './PaletteBar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const propTypes = {
  children: PropTypes.node,
}

function PaletteBar({ children }) {
  return (
    <ul className={s.barList}>
      {children}
    </ul>
  )
}

PaletteBar.propTypes = propTypes
export default withStyles(s)(PaletteBar)
