import React, { PropTypes } from 'react'
import s from './PaletteBar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const propTypes = {
  children: PropTypes.node,
}

function PaletteBar({ children }) {
  return (
    <aside className={s.container}>
      <div className={s.row}>
        {children}
      </div>
    </aside>
  )
}

PaletteBar.propTypes = propTypes
export default withStyles(s)(PaletteBar)
