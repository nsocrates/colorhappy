import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { makePaletteUserSelector } from 'reducers/selectors'
import { user, userPalette } from 'actions/users'
import { Loader } from 'components/Loader'

const propTypes = {
  modalProps: PropTypes.object,
  modalComponent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  sorted: PropTypes.object,
  params: PropTypes.object,
  paletteEntity: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired,
  palettes: PropTypes.object,
}

class ProfileContainer extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props

    dispatch(user.request({ id: params.id }))
    dispatch(userPalette.request({ id: params.id }))
  }

  render() {
    const { palettes } = this.props

    if (!palettes) return <Loader />

    return (
      <Profile {...this.props} />
    )
  }
}

ProfileContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makePaletteUserSelector('palettesByUser', props.params.id)(state)

export default connect(makeMapStateToProps)(ProfileContainer)
