import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Palette from './Palette'

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
}

class PaletteContainer extends Component {
  componentDidMount() {
    const { params } = this.props
    // TODO: Grab palette by params.id and dispatch a fetch request
  }

  render() {
    return (
      <Palette {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    state,
  }
}

PaletteContainer.propTypes = propTypes
export default connect(mapStateToProps)(PaletteContainer)
