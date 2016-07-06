import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteItem from './PaletteItem'
// import { generatePalette } from 'utils/color/index'

const propTypes = {
  children: PropTypes.node,
}

class Palette extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.currentTarget.focus()
    e.currentTarget.select()
  }

  handleChange(e) {
    e.preventDefault()
  }

  render() {
    const colors = ['dde8b9', 'e8d2ae', 'd7b29d', 'cb8589', '796465']
    const palette = colors.map((color, index) =>
      <PaletteItem
        hex={`#${color}`}
        onChange={this.handleChange}
        onClick={this.handleClick}
        key={`${color}_${index}`}
      />)

    return (
      <main className={s.main}>
        <ul className={s.paletteList}>
          {palette}
        </ul>
      </main>
    )
  }
}

Palette.propTypes = propTypes

export default withStyles(s)(Palette)
