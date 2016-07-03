import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import { contrastHex } from 'utils/color'

const propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

function PaletteItem({ color, onChange }) {
  return (
    <li
      className={s.paletteListItem}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 0 1px ${color}`,
        color: contrastHex(color),
      }}
    >
      <div className={s.hex}>
        <input
          type="text"
          className={s.hexInput}
          value={color}
          onChange={onChange}
        />
      </div>
    </li>
  )
}

PaletteItem.propTypes = propTypes
export default withStyles(s)(PaletteItem)
