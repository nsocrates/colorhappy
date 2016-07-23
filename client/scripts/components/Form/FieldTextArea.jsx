import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Form.scss'

const propTypes = {
  Icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  label: PropTypes.string,
  reference: PropTypes.func,
}

function FieldTextArea(props) {
  const { reference, Icon, label, ...rest } = props
  return (
    <fieldset className={s.formGroup}>
      <legend className={s.formLegend}>
        {label}
      </legend>
      <div className={s.inputContainer}>
        <textArea
          {...rest}
          className={s.formTextArea}
          type="text"
          ref={reference}
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
