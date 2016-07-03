import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteItem from './PaletteItem'

const propTypes = {
  children: PropTypes.node,
}

class Palette extends Component {
  render() {
    const handleChange = e => {
      e.preventDefault()
      console.log(e.currentTarget.value)
    }

    return (
      <main className={s.main}>
        <ul className={s.paletteList}>
          <PaletteItem color={'#dde8b9'} onChange={handleChange} />
          <PaletteItem color={'#e8d2ae'} onChange={handleChange} />
          <PaletteItem color={'#d7b29d'} onChange={handleChange} />
          <PaletteItem color={'#cb8589'} onChange={handleChange} />
          <PaletteItem color={'#796465'} onChange={handleChange} />
        </ul>
      </main>
    )
  }
}

Palette.propTypes = propTypes

export default withStyles(s)(Palette)
