/**
 * Root Modal Component that is connected to the Redux Store.
 * Unlike ModalHOC, this component does not activate in response to route transitions.
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SavePaletteModal from './SavePaletteModal/SavePaletteModal'
import { makeModalSelector } from 'reducers/selectors'

const MODAL_COMPONENTS = {
  SAVE_PALETTE: SavePaletteModal,
}

const propTypes = {
  modalProps: PropTypes.object,
  modalComponent: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

function RootModal({ modalProps, modalComponent, dispatch }) {
  const Component = MODAL_COMPONENTS[modalComponent]
  return modalComponent ? <Component {...modalProps} dispatch={dispatch} /> : null
}

RootModal.propTypes = propTypes

const makeMapStateToProps = () => (state) =>
  makeModalSelector()(state)

export default connect(makeMapStateToProps)(RootModal)
