// https://github.com/kriasoft/isomorphic-style-loader/issues/15
import React, { PropTypes } from 'react'
import s from 'styles/_main.scss'

export default class StylesContext extends React.Component {
  getChildContext() {
    return { insertCss: this.props.onInsertCss }
  }

  componentWillMount() {
    const { onInsertCss } = this.props
    this.removeCss = onInsertCss(s)
  }

  componentWillUnmount() {
    this.removeCss()
  }

  render() {
    return this.props.children
  }
}

StylesContext.propTypes = {
  children: PropTypes.node.isRequired,
  onInsertCss: PropTypes.func.isRequired,
}

StylesContext.childContextTypes = {
  insertCss: PropTypes.func.isRequired,
}
