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
  className: PropTypes.string,
  hasError: PropTypes.bool,
}

const defaultProps = {
  type: 'text',
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
    const {
      type,
      reference,
      Icon,
      RightIcon,
      label,
      hasError,
      ...rest,
    } = this.props

    return (
      <fieldset className={s.formGroup}>
        <legend className={hasError ? s.formLegend__hasError : s.formLegend__noError}>
          {label}
        </legend>
        <div className={s.inputContainer}>
          <input
            {...rest}
            ref={reference}
            className={hasError ? s.formInput__hasError : s.formInput__noError}
            type={this.state.showPassword && 'text' || type}
          />
          {Icon && <Icon className={s.svgIcon} />}
          {RightIcon &&
            <label
              className={s.svgBtnRight}
              onClick={this.handleVisibilityToggle}
              style={{ color: this.state.showPassword && '#70b7ba' }}
            >
              <RightIcon className={s.svgIconRight} />
            </label>
          }
        </div>
      </fieldset>
    )
  }
}

FieldInput.propTypes = propTypes
FieldInput.defaultProps = defaultProps

export default withStyles(s)(FieldInput)
