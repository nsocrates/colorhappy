import React, { PropTypes, Component } from 'react'
import s from './PaletteToolbar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

class ToolbarControl extends Component {
  render() {
    const { label, name, ...rest } = this.props
    return (
      <fieldset className={s[`inputControl__${name}`]}>
        <label className={s.inputGroup}>
          <span className={s.inputCaption}>{`${label}: `}</span>
          <input {...rest} className={s.input} name={name} />
        </label>
      </fieldset>
    )
  }
}

ToolbarControl.propTypes = propTypes

export default withStyles(s)(ToolbarControl)
