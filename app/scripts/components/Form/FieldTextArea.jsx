import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Form.scss'

const propTypes = {
  Icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  hasError: PropTypes.bool,
}

function FieldTextArea(props) {
  const { Icon, hasError = false, label, ...rest } = props
  return (
    <fieldset className={s.formGroup}>
      <legend className={hasError ? s.formLegend__hasError : s.formLegend__noError}>
        {label}
      </legend>
      <div className={s.inputContainer}>
        <textArea
          {...rest}
          className={hasError ? s.formTextArea__hasError : s.formTextArea__noError}
          type="text"
        />
        {Icon &&
          <Icon className={s.svgIcon__textarea} />
        }
      </div>
    </fieldset>
  )
}

FieldTextArea.propTypes = propTypes
export default withStyles(s)(FieldTextArea)
