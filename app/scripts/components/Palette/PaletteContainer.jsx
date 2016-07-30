import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { palette } from 'actions/palettes'
import { makePaletteUserSelector } from 'reducers/selectors'
import Palette from './Palette'
import { Loader } from 'components/Loader/Loader'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired,
  user: PropTypes.object,
}

class PaletteContainer extends Component {
  componentDidMount() {
    const { params, dispatch } = this.props
    dispatch(palette.request({ id: params.id }))
  }

  render() {
    return (
      !Object.keys(this.props.palette).length || !Object.keys(this.props.user)
        ? <Loader />
        : <Palette {...this.props} />
    )
  }
}

const makeMapStateToProps = () => (state, props) =>
  makePaletteUserSelector()(state, props.params.id)

PaletteContainer.propTypes = propTypes

export default connect(makeMapStateToProps)(PaletteContainer)
