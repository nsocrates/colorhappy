import React, { PropTypes, Component } from 'react'
import { Download, Backup, Shuffle } from 'components/Svg'
import { modal } from 'actions/modal'
import { notif } from 'actions/notifications'
import { stringifier } from 'utils/transformations'
import { BASE_URL } from 'constants/api'
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
  session: PropTypes.object.isRequired,
}

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.handleRandomize = this.handleRandomize.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleRandomize(e) {
    e.preventDefault()
    this.props.generateColors()
  }

  handleSave(e) {
    const { editor, dispatch, session } = this.props
    e.preventDefault()

    if (!session.isAuthenticated) {
      dispatch(notif.create({ message: 'Login or signup to save your palette.' }))
    } else {
      dispatch(modal.show({
        modalComponent: 'SAVE_PALETTE',
        modalProps: {
          colors: this.mapHex(editor),
        },
      }))
    }
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

    const BarComponent = (
      <PaletteBar>
        <BarItem to={"#"} Icon={Backup} label={"Save"} onClick={this.handleSave} />
        <BarItem to={"#"} Icon={Shuffle} label={"Shuffle"} onClick={this.handleRandomize} />
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
      <PaletteWrapper Bar={BarComponent}>
        {colors}
      </PaletteWrapper>
    )
  }
}

Editor.propTypes = propTypes
