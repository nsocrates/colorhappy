import React, { PropTypes } from 'react'
import s from './PaletteToolbar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Setting } from 'components/Svg'

const propTypes = {
  onClick: PropTypes.func,
}

function ToolbarToggler(props) {
  return (
    <div className={s.toggleWrap}>
      <button className={s.toggleBtn} onClick={props.onClick}>
        <label className={s.toggleLabel}>
          <Setting className={s.toggleSvg} />
          <span className={s.toggleText}>
            {"Edit"}
          </span>
        </label>
      </button>
    </div>
  )
}

ToolbarToggler.propTypes = propTypes

export default withStyles(s)(ToolbarToggler)
