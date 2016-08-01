import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import PaletteWrapper from './PaletteWrapper'
import PaletteColor from './PaletteColor'
import PaletteBar from './Bar/PaletteBar'
import BarItem from './Bar/BarItem'
import UserTab from './UserTab/UserTab'
import { paletteLove } from 'actions/palettes'
import { Love, ModeEdit, Download } from 'components/Svg'
import { stringifier } from 'utils/transformations'
import { BASE_URL } from 'constants/api'

const propTypes = {
  palette: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
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
    const { palette, user } = this.props
    const stringified = stringifier(palette.colors)
    const colors = palette.colors.map((color, index) =>
      <PaletteColor
        hex={`#${color}`}
        key={`${color}_${index}`}
      />)

    const TabComponent = <UserTab user={user} />
    const BarComponent = (
      <PaletteBar>
        <BarItem to={"#"} Icon={Love} label={"Like"} onClick={this.handleLove} />
        <BarItem to={`/editor/${stringified}`} Icon={ModeEdit} label={"Edit"} />
        <BarItem
          anchor
          download
          href={`${BASE_URL}/api/palettes/download/${stringified}`}
          Icon={Download}
          label={"Export"}
        />
      </PaletteBar>
    )

    return (
      <PaletteWrapper UserTab={TabComponent} Bar={BarComponent}>
        {colors}
      </PaletteWrapper>
    )
  }
}

Palette.propTypes = propTypes

export default withStyles(s)(Palette)
