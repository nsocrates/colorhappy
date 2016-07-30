import React, { PropTypes } from 'react'
import s from './Palette.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const propTypes = {
  children: PropTypes.node,
  UserTab: PropTypes.node,
  Bar: PropTypes.node,
}

function PaletteWrapper({ children, UserTab = null, Bar = null }) {
  return (
    <main className={s.main}>
      {UserTab}
      <ul className={s.paletteList}>
        {children}
      </ul>
      {Bar}
    </main>
  )
}

PaletteWrapper.propTypes = propTypes

export default withStyles(s)(PaletteWrapper)
