import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteWrapper from './PaletteWrapper'
import PaletteColor from './PaletteColor'
import PaletteBar from './Bar/PaletteBar'
import BarItem from './Bar/BarItem'
import { paletteLove } from 'actions/palettes'
import { Love, ModeEdit, Download } from 'components/Svg'
import { stringifier } from 'utils/transformations'

const propTypes = {
  palette: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
}

class Palette extends Component {
  constructor(props) {
    super(props)
    this.handleLove = this.handleLove.bind(this)
  }

  handleLove(e) {
    const { dispatch, params } = this.props
    e.preventDefault()
    dispatch(paletteLove.request({ id: params.id }))
  }

  render() {
    const { palette } = this.props
    const stringified = stringifier(palette.colors)
    const colors = palette.colors.map((color, index) =>
      <PaletteColor
        hex={`#${color}`}
        key={`${color}_${index}`}
      />)

    return (
      <PaletteWrapper>
        {colors}
        <PaletteBar>
          <BarItem href={`//localhost:8000/api/palettes/download/${stringified}`} Icon={Download} label={"Export"} anchor download />
          <BarItem to={`/editor/${stringified}`} Icon={ModeEdit} label={"Edit"} />
          <BarItem to={"#"} Icon={Love} label={"Love"} onClick={this.handleLove} />
        </PaletteBar>
      </PaletteWrapper>
    )
  }
}

Palette.propTypes = propTypes

export default withStyles(s)(Palette)
