import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Modal.scss'

const propTypes = {
  handleExit: PropTypes.func,
  children: PropTypes.node,
}

class Modal extends Component {
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
    return (
      <aside
        className={s.modal}
        onClick={this.handleExit}
        onKeyDown={this.listenForClose}
      >
        {this.props.children}
      </aside>
    )
  }
}

Modal.propTypes = propTypes

export default withStyles(s)(Modal)
