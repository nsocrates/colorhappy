import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import { round, hex as h } from 'utils/color/index'
import ntc from 'vendor/ntc'
import PaletteOptions from './PaletteOptions'

const propTypes = {
  hex: PropTypes.string.isRequired,
  allColors: PropTypes.array.isRequired,
}

function PaletteColor({ hex, allColors, ...rest }) {
  const rgb = round(h.toRgb(hex)).join(', ')
  const textColor = h.contrast(hex)
  return (
    <li
      className={s.paletteListItem}
      style={{
        backgroundColor: hex,
        boxShadow: `0 0 0 1px ${hex}`,
        color: textColor,
      }}
    >
      <div className={s.colorGroup}>
        <small className={s.colorName}>
          {ntc.name(hex)[1]}
        </small>
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

      {allColors && <PaletteOptions allColors={allColors} />}

    </li>
  )
}

PaletteColor.propTypes = propTypes
export default withStyles(s)(PaletteColor)
