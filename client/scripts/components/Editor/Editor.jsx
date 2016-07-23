import React, { PropTypes, Component } from 'react'
import { Download, Backup, Shuffle } from 'components/Svg'
import { paletteSave } from 'actions/palettes'
import { modal } from 'actions/modal'
import { stringifier } from 'utils/transformations'
import {
  PaletteWrapper,
  PaletteColor,
  PaletteToolbar,
  PaletteBar,
  BarItem,
} from 'components/Palette'


const propTypes = {
  editor: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  generateColors: PropTypes.func.isRequired,
}

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleRandomize = this.handleRandomize.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleToggle(e) {
    e.preventDefault()
  }

  handleRandomize(e) {
    e.preventDefault()
    this.props.generateColors()
  }

  handleSave(e) {
    const { editor, dispatch } = this.props
    e.preventDefault()
    dispatch(modal.show({
      modalComponent: 'SAVE_PALETTE',
      modalProps: {
        colors: this.mapHex(editor),
        dispatch,
      },
    }))
    // dispatch(paletteSave.request({
    //   colors: this.mapHex(editor),
    // }))
  }

  // Helper method that returns an array of color namespaces
  mapNamespace(editor) {
    return Object.keys(editor).filter(n => n !== 'hasLoaded')
  }

  // Helper method composed of mapNamespace
  // Returns an array of hexidecimal colors
  mapHex(editor) {
    return this.mapNamespace(editor).map(color => editor[color].hex)
  }

  render() {
    const { editor, dispatch } = this.props
    const namespace = this.mapNamespace(editor)
    const stringified = stringifier(this.mapHex(editor))

    const colors = namespace.map((color, index) => {
      const { hex, isVisible } = editor[color]

      return (
        <PaletteColor
          hex={`#${hex}`}
          key={index}
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
          <BarItem to={"#"} Icon={Backup} label={"Save"} onClick={this.handleSave} />
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
