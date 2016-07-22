import React, { Component, PropTypes } from 'react'
import s from './PaletteToolbar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ToolbarControl from './ToolbarControl'
import ToolbarToggler from './ToolbarToggler'
import { toggleToolbar, changeColor } from 'actions/editor'
import debounce from 'utils/debounce'
import { validateHex } from 'utils/color'

// TODO: Improve UX on change/submit for instant feedback & persist focus

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
    this.dispatchChanges = debounce(this.dispatchChanges, 500)
  }

  handleToggle(e) {
    e.preventDefault()
    const { dispatch, namespace } = this.props
    dispatch(toggleToolbar({ namespace }))
  }

  handleChangeHex(e) {
    this.setState({ hex: e.target.value })
    this.dispatchChanges('hex', e.target.value)
  }

  handleChangeRgb(e) {
    const ns = {
      [e.target.getAttribute('data-controller')]: parseInt(e.target.value, 10),
    }
    this.updateRgb(ns)
  }

  updateRgb(ns) {
    const { r, g, b } = this.state
    const rgb = Object.assign({}, { r, g, b }, ns)
    this.setState(rgb)
    this.dispatchChanges('rgb', Object.values(rgb))
  }

  dispatchChanges(method, value) {
    const { dispatch, namespace } = this.props
    if (method === 'hex') {
      const validHex = validateHex(value)
      return validHex
        ? dispatch((changeColor[method]({ namespace, value: validHex })))
        : null
    }

    return dispatch((changeColor[method]({ namespace, value })))
  }

  render() {
    const { isVisible } = this.props
    const { hex, r, g, b } = this.state

    return (
      <aside className={isVisible ? s.toolbar__visible : s.toolbar}>
        <div className={s.toolbarContainer}>

          <form className={s.formGroup} onChange={this.handleChangeHex}>
            <ToolbarControl
              name="hex"
              label="Hex"
              type="text"
              value={hex}
              data-controller={'hex'}
            />
          </form>

          <form className={s.formGroup} onChange={this.handleChangeRgb}>

            <ToolbarControl
              name="rgb"
              label="R"
              value={r}
              type="number"
              min="0"
              max="255"
              data-controller={'r'}
            />

            <ToolbarControl
              name="rgb"
              label="G"
              value={g}
              type="number"
              min="0"
              max="255"
              data-controller={'g'}
            />

            <ToolbarControl
              name="rgb"
              label="B"
              value={b}
              type="number"
              min="0"
              max="255"
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
