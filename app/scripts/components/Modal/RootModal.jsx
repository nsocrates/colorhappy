/**
 * Root Modal Component that is connected to the Redux Store.
 * Prop changes that our modal components require will not be passed down
 * after the initial render, so we need to make more containers when neccessary.
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { makeModalSelector } from 'reducers/selectors'
import SavePaletteModal from './SavePaletteModal/SavePaletteModal'
import AuthModalContainer from './AuthModal/AuthModalContainer'

const MODAL_COMPONENTS = {
  SAVE_PALETTE: SavePaletteModal,
  LOGIN: AuthModalContainer,
  SIGNUP: AuthModalContainer,
}

const propTypes = {
  modalProps: PropTypes.object,
  modalComponent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

function RootModal({ modalProps, modalComponent, dispatch }) {
  const Component = MODAL_COMPONENTS[modalComponent]
  return modalComponent
    ? <Component {...modalProps} modalComponent={modalComponent} dispatch={dispatch} />
    : null
}

RootModal.propTypes = propTypes

const makeMapStateToProps = () => state =>
  makeModalSelector()(state)

export default connect(makeMapStateToProps)(RootModal)
