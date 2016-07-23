import React, { Component, PropTypes } from 'react'

const propTypes = {
  onExit: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
}

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.listenForClose = this.listenForClose.bind(this)
  }

  componentDidMount() {
    this._modal.focus()
  }

  handleClick() {
    return this.props.onExit()
  }

  listenForClose(e) {
    const { key, keycode } = e

    if (key === 'Escape' || keycode === 27) {
      e.preventDefault()
      this.props.onExit()
    }
  }

  render() {
    const { style } = this.props
    const styles = {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '9000',
      outline: '0',
    }

    return (
      <aside
        onClick={this.handleClick}
        onKeyDown={this.listenForClose}
        style={Object.assign({}, styles, style)}
        ref={c => (this._modal = c)}
        tabIndex="-1"
      >
        {this.props.children}
      </aside>
    )
  }
}

Modal.propTypes = propTypes
