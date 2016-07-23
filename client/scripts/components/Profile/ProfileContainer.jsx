import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { makeProfileSelector, makeBrowserSelector } from 'reducers/selectors'
import { paletteArray } from 'actions/palettes'
import { Loader } from 'components/Loader'

const propTypes = {
  modalProps: PropTypes.object,
  modalComponent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  sorted: PropTypes.object,
}

class ProfileContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(paletteArray.request({ sort: '-createdAt' }))
  }

  render() {
    const { sorted } = this.props

    if (!sorted.ids.length) return <Loader />

    return (
      <Profile {...this.props} />
    )
  }
}

ProfileContainer.propTypes = propTypes

const makeMapStateToProps = () => state =>
  makeBrowserSelector()(state, 'newest')

export default connect(makeMapStateToProps)(ProfileContainer)
