import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteItem from './PaletteItem'
import LoaderHOC from 'components/LoaderHOC/LoaderHOC'
// import { generatePalette } from 'utils/color/index'

const propTypes = {
  palette: PropTypes.object,
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
    const { palette } = this.props
    const colors = palette.colors.map((color, index) =>
      <PaletteItem
        hex={`#${color}`}
        onChange={this.handleChange}
        onClick={this.handleClick}
        key={`${color}_${index}`}
      />)

    return (
      <main className={s.main}>
        <ul className={s.paletteList}>
          {colors}
        </ul>
      </main>
    )
  }
}

Palette.propTypes = propTypes

const WithLoader = LoaderHOC(Palette, 'palette')
export default withStyles(s)(WithLoader)
