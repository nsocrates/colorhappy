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
}

function RootModal(props) {
  const { modalComponent, modalProps } = props
  const Component = MODAL_COMPONENTS[modalComponent]
  return modalComponent ? <Component {...modalProps} /> : null
}

RootModal.propTypes = propTypes

const makeMapStateToProps = () => (state) =>
  makeModalSelector()(state)

export default connect(makeMapStateToProps)(RootModal)
