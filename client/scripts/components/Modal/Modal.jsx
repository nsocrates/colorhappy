import React, { Component, PropTypes } from 'react'

const propTypes = {
  handleExit: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
}

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.handleExit = this.handleExit.bind(this)
    this.listenForClose = this.listenForClose.bind(this)
  }

  handleExit() {
    return this.props.handleExit()
  }

  listenForClose(e) {
    const { key, keycode } = e

    if (key === 'Escape' || keycode === 27) {
      this.props.handleExit()
    }
  }

  render() {
    const { style, ...rest } = this.props
    const styles = {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '9000',
    }

    return (
      <aside
        {...rest}
        onClick={this.handleExit}
        onKeyDown={this.listenForClose}
        style={Object.assign({}, styles, style)}
      >
        {this.props.children}
      </aside>
    )
  }
}

Modal.propTypes = propTypes
