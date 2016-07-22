import React, { PropTypes } from 'react'
import s from './Palette.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const propTypes = {
  children: PropTypes.node,
}

function PaletteWrapper({ children }) {
  return (
    <main className={s.main}>
      <ul className={s.paletteList}>
        {children}
      </ul>
    </main>
  )
}

PaletteWrapper.propTypes = propTypes

export default withStyles(s)(PaletteWrapper)
