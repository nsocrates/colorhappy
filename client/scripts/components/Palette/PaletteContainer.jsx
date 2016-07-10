import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { palette } from 'actions/palettes'
import { makePaletteSelector } from 'reducers/selectors'
import Palette from './Palette'
import Loader from 'components/Loader/Loader'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  palette: PropTypes.object.isRequired,
}

class PaletteContainer extends Component {
  componentDidMount() {
    const { params, dispatch } = this.props
    dispatch(palette.request({ id: params.id }))
  }

  render() {
    return (
      !Object.keys(this.props.palette).length
        ? <Loader containerStyle={{ paddingTop: '100px' }} />
        : <Palette palette={this.props.palette} />
    )
  }
}

const makeMapStateToProps = () => {
  const paletteSelector = makePaletteSelector()
  const mapStateToProps = (state, props) => paletteSelector(state, props)
  return mapStateToProps
}

PaletteContainer.propTypes = propTypes

export default connect(makeMapStateToProps)(PaletteContainer)
