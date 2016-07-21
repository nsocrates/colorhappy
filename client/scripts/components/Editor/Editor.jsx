import React, { PropTypes, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Editor.scss'
import PaletteColor from 'components/Palette/PaletteColor'
import PaletteToolbar from 'components/Palette/Toolbar/PaletteToolbar'

const propTypes = {
  children: PropTypes.node,
  editor: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

class Editor extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
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

  render() {
    const { editor, dispatch } = this.props
    const colors = Object.keys(editor)
      .filter(n => n !== 'hasLoaded' && n !== 'isVisible')
      .map((color, index) => {
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
      <main className={s.main}>
        <ul className={s.paletteList}>
          {colors}
        </ul>
      </main>
    )
  }
}

Editor.propTypes = propTypes

export default withStyles(s)(Editor)
