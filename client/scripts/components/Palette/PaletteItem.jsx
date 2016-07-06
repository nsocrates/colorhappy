import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import { round, hex as h } from 'utils/color/index'

const propTypes = {
  hex: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

function PaletteItem({ hex, ...rest }) {
  const rgb = round(h.toRgb(hex)).join(', ')
  return (
    <li
      className={s.paletteListItem}
      style={{
        backgroundColor: hex,
        boxShadow: `0 0 0 1px ${hex}`,
        color: h.contrast(hex),
      }}
    >
      <div className={s.colorCode}>
        <input
          {...rest}
          type="text"
          className={s.hexInput}
          value={hex}
        />
        <input
          {...rest}
          type="text"
          className={s.rgbInput}
          value={rgb}
        />
      </div>
    </li>
  )
}

PaletteItem.propTypes = propTypes
export default withStyles(s)(PaletteItem)
