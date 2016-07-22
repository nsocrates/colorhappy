import React, { PropTypes, Component } from 'react'
import PaletteWrapper from 'components/Palette/PaletteWrapper'
import PaletteColor from 'components/Palette/PaletteColor'
import PaletteToolbar from 'components/Palette/Toolbar/PaletteToolbar'
import PaletteBar from 'components/Palette/Bar/PaletteBar'
import BarItem from 'components/Palette/Bar/BarItem'
import { Download, Backup, Shuffle } from 'components/Svg'
import { stringifier } from 'utils/transformations'

const propTypes = {
  editor: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  generateColors: PropTypes.func.isRequired,
}

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleRandomize = this.handleRandomize.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
  }

  handleChange(e) {
    e.preventDefault()
  }

  handleToggle(e) {
    e.preventDefault()
  }

  handleRandomize(e) {
    e.preventDefault()
    this.props.generateColors()
  }

  render() {
    const { editor, dispatch } = this.props
    const payload = Object.keys(editor).filter(n => n !== 'hasLoaded')
    const stringified = stringifier(
      payload.map(color => editor[color].hex)
    )

    const colors = payload.map((color, index) => {
      const { hex, isVisible } = editor[color]

      return (
        <PaletteColor
          hex={`#${hex}`}
          onChange={this.handleChange}
          onClick={this.handleClick}
          key={`${hex}_${index}`}
        >
          <PaletteToolbar
            namespace={color}
            color={editor[color]}
            isVisible={isVisible}
            dispatch={dispatch}
          />
        </PaletteColor>
      )
    })

    return (
      <PaletteWrapper>
        {colors}
        <PaletteBar>
          <BarItem to={"#"} Icon={Shuffle} label={"Randomize"} onClick={this.handleRandomize} />
          <BarItem to={"#"} Icon={Backup} label={"Save"} onClick={e => e.preventDefault()} />
          <BarItem
            anchor
            download
            href={`//localhost:8000/api/palettes/download/${stringified}`}
            Icon={Download}
            label={"Export"}
          />
        </PaletteBar>
      </PaletteWrapper>
    )
  }
}

Editor.propTypes = propTypes
