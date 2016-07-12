import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Form.scss'

const propTypes = {
  Icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  RightIcon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  reference: PropTypes.func,
  type: PropTypes.string,
}

class FieldInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showPassword: false }
    this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this)
  }

  handleVisibilityToggle(e) {
    e.preventDefault()
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const { type, reference, Icon, RightIcon, label, ...rest } = this.props
    return (
      <fieldset className={s.formGroup}>
        <legend className={s.formLegend}>
          {label}
        </legend>
        <div className={s.inputContainer}>
          <input
            {...rest}
            ref={reference}
            className={s.formInput}
            type={this.state.showPassword && 'text' || type}
          />
          {Icon && <Icon className={s.svgIcon} />}
          {RightIcon &&
            <button
              className={s.svgBtnRight}
              onClick={this.handleVisibilityToggle}
              style={{ color: this.state.showPassword && '#70b7ba' }}
            >
              <RightIcon className={s.svgIconRight} />
            </button>
          }
        </div>
      </fieldset>
    )
  }
}

FieldInput.propTypes = propTypes

export default withStyles(s)(FieldInput)
