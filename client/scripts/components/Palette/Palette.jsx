import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteItem from './PaletteItem'
import { generatePalette } from 'utils/color/index'

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
    const palette = generatePalette()
    const list = palette.map((color, index) =>
      <PaletteItem
        color={`#${color}`}
        onChange={this.handleChange}
        onClick={this.handleClick}
        key={`${color}_${index}`}
      />)
    return (
      <main className={s.main}>
        <ul className={s.paletteList}>
          {list}
{/*
          <PaletteItem color={'#dde8b9'} onChange={this.handleChange} onClick={this.handleClick} />
          <PaletteItem color={'#e8d2ae'} onChange={this.handleChange} onClick={this.handleClick} />
          <PaletteItem color={'#d7b29d'} onChange={this.handleChange} onClick={this.handleClick} />
          <PaletteItem color={'#cb8589'} onChange={this.handleChange} onClick={this.handleClick} />
          <PaletteItem color={'#796465'} onChange={this.handleChange} onClick={this.handleClick} />
*/}
        </ul>
      </main>
    )
  }
}

Palette.propTypes = propTypes

export default withStyles(s)(Palette)
