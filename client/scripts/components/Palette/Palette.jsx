import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteColor from './PaletteColor'
import PaletteOptions from './PaletteOptions'

const propTypes = {
  palette: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
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
    const { palette, dispatch, params } = this.props
    const colors = palette.colors.map((color, index) =>
      <PaletteColor
        hex={`#${color}`}
        onChange={this.handleChange}
        onClick={this.handleClick}
        key={`${color}_${index}`}
      >

        {index === 2 &&
          <PaletteOptions dispatch={dispatch} allColors={palette.colors} params={params} />
        }

      </PaletteColor>)

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

export default withStyles(s)(Palette)
