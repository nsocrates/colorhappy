import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { makePaginatedPaletteUserSelector } from 'reducers/selectors'
import { loadUserPalettes, userPalette } from 'actions/users'

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
  constructor(props) {
    super(props)
    this.handleLoadUserPalettes = this.handleLoadUserPalettes.bind(this)
    this.handleLoadMorePalettes = this.handleLoadMorePalettes.bind(this)
  }

  componentDidMount() {
    this.handleLoadUserPalettes()
  }

  handleLoadUserPalettes() {
    const { dispatch, params } = this.props
    dispatch(loadUserPalettes({ id: params.id }, false))
  }

  handleLoadMorePalettes(e) {
    if (e) e.preventDefault()
    const { dispatch, params, palettes } = this.props
    dispatch(userPalette.request({
      id: params.id,
      options: {
        sort: 'title',
        page: palettes ? palettes.pageCount + 1 : 1,
        limit: 3,
      },
    }))
  }

  render() {
    return (
      <Profile
        {...this.props}
        handleLoadMorePalettes={this.handleLoadMorePalettes}
      />
    )
  }
}

ProfileContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makePaginatedPaletteUserSelector('palettesByUser', props.params.id)(state)

export default connect(makeMapStateToProps)(ProfileContainer)
