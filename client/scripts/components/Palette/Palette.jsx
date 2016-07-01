import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteItem from './PaletteItem'

const propTypes = {
  children: PropTypes.node,
}

class Palette extends Component {
  render() {
    return (
      <main className={s.main}>
        <ul className={s.paletteList}>
          <PaletteItem color={'#dde8b9'} />
          <PaletteItem color={'#e8d2ae'} />
          <PaletteItem color={'#d7b29d'} />
          <PaletteItem color={'#cb8589'} />
          <PaletteItem color={'#796465'} />
        </ul>
      </main>
    )
  }
}

Palette.propTypes = propTypes

export default withStyles(s)(Palette)
