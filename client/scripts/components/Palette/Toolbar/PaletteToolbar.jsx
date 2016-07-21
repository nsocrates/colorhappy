import React, { Component, PropTypes } from 'react'
import s from './PaletteToolbar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ToolbarControl from './ToolbarControl'
import ToolbarToggler from './ToolbarToggler'
import { toggleToolbar, changeColor } from 'actions/editor'

// TODO: Improve UX on change/submit

const propTypes = {
  color: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  namespace: PropTypes.string.isRequired,
}

class PaletteToolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hex: props.color.hex,
      r: props.color.rgb[0],
      g: props.color.rgb[1],
      b: props.color.rgb[2],
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChangeHex = this.handleChangeHex.bind(this)
    this.handleChangeRgb = this.handleChangeRgb.bind(this)
    this.updateRgb = this.updateRgb.bind(this)
  }

  handleToggle(e) {
    e.preventDefault()
    const { dispatch, namespace } = this.props
    dispatch(toggleToolbar({ namespace }))
  }

  handleChangeHex(e) {
    const { dispatch, namespace } = this.props
    dispatch(changeColor.hex({ namespace, value: e.target.value }))
  }

  handleChangeRgb(e) {
    const ns = {
      [e.target.getAttribute('data-controller')]: e.target.value,
    }

    this.updateRgb(ns)
  }

  updateRgb(ns) {
    const { dispatch, namespace } = this.props
    const { r, g, b } = this.state
    const rgb = Object.assign({}, { r, g, b }, ns)
    dispatch(changeColor.rgb({ namespace, value: Object.values(rgb) }))
  }

  render() {
    const { color, isVisible } = this.props
    const { hex, rgb } = color
    const [r, g, b] = rgb

    return (
      <aside className={isVisible ? s.toolbar__visible : s.toolbar}>
        <div className={s.toolbarContainer}>

          <form className={s.formGroup} onChange={this.handleChangeHex}>
            <ToolbarControl
              name="hex"
              label="Hex"
              type="text"
              defaultValue={hex}
              data-controller={'hex'}
            />
          </form>

          <form className={s.formGroup} onChange={this.handleChangeRgb}>

            <ToolbarControl
              name="rgb"
              label="R"
              defaultValue={r}
              type="number"
              min="0"
              max="250"
              data-controller={'r'}
            />

            <ToolbarControl
              name="rgb"
              label="G"
              defaultValue={g}
              type="number"
              min="0"
              max="250"
              data-controller={'g'}
            />

            <ToolbarControl
              name="rgb"
              label="B"
              defaultValue={b}
              type="number"
              min="0"
              max="250"
              data-controller={'b'}
            />

          </form>
        </div>
        <ToolbarToggler onClick={this.handleToggle} />
      </aside>
    )
  }
}

PaletteToolbar.propTypes = propTypes

export default withStyles(s)(PaletteToolbar)
