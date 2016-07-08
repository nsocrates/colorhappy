import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { palette } from 'actions/palettes'
import { paletteSelector } from 'reducers/selectors'
import Palette from './Palette'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  palette: PropTypes.object,
}

class PaletteContainer extends Component {
  componentDidMount() {
    const { params, dispatch } = this.props
    dispatch(palette.request({ id: params.id }))
  }

  render() {
    return (
      <Palette palette={this.props.palette} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return paletteSelector(state, ownProps)
}

PaletteContainer.propTypes = propTypes

export default connect(mapStateToProps)(PaletteContainer)
