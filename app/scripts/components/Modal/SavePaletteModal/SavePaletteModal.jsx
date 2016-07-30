import React, { PropTypes, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './SavePaletteModal.scss'
import { ModalForm } from 'components/Modal'
import { FieldInput, FieldTextArea } from 'components/Form'
import Modal from '../Modal'
import { modal } from 'actions/modal'
import { paletteSave } from 'actions/palettes'

const propTypes = {
  dispatch: PropTypes.func,
  colors: PropTypes.array,
}

class SavePaletteModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'My New Palette',
      description: '',
    }
    this.handleExit = this.handleExit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.savePalette()
  }

  handleChange(e) {
    e.preventDefault()
    const input = {
      [e.target.getAttribute('data-controller')]: e.target.value,
    }
    this.setState(input)
  }

  handleExit(e) {
    const { dispatch } = this.props
    e.preventDefault()
    dispatch(modal.hide())
  }

  savePalette() {
    const { dispatch, colors } = this.props
    const payload = Object.assign({}, { colors }, this.state)
    dispatch(paletteSave.request(payload))
  }

  render() {
    return (
      <Modal handleExit={this.handleExit}>
        <div className={s.container}>
          <ModalForm
            onExit={this.handleExit}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            className={s.modalForm}
            heading="Save Your Palette"
          >
            <FieldInput
              label="Title"
              type="text"
              value={this.state.title}
              style={{ textIndent: '0' }}
              data-controller={'title'}
            />
            <FieldTextArea
              value={this.state.description}
              label="Description"
              data-controller={'description'}
              style={{ textIndent: '0', paddingLeft: '0.9375em' }}
            />
            <button type="submit" className={s.saveBtn}>
              {"Save"}
            </button>
          </ModalForm>
        </div>
      </Modal>
    )
  }
}

SavePaletteModal.propTypes = propTypes

export default withStyles(s)(SavePaletteModal)
