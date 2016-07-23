import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Palette.scss'
import { round, hex as h } from 'utils/color'
import ntc from 'vendor/ntc'

const propTypes = {
  hex: PropTypes.string.isRequired,
  children: PropTypes.node,
}

function PaletteColor({ children, hex, ...rest }) {
  const rgb = round(h.toRgb(hex)).join(', ')
  const textColor = h.contrast(hex)

  const handleClick = e => {
    e.target.select()
  }

  return (
    <li
      className={s.paletteListItem}
      style={{
        backgroundColor: hex,
        boxShadow: `0 1px 6px rgba(${rgb}, 0.117647),
                    0 1px 4px rgba(${rgb}, 0.117647)`,
        color: textColor,
      }}
    >
      <div className={s.colorGroup}>
        <small className={s.colorName}>
          {ntc.name(hex)[1]}
        </small>
        <input
          {...rest}
          readOnly
          type="text"
          className={s.hexInput}
          value={hex}
          onClick={handleClick}
        />
        <input
          {...rest}
          readOnly
          type="text"
          className={s.rgbInput}
          value={rgb}
          onClick={handleClick}
        />
      </div>
      {children}
    </li>
  )
}

PaletteColor.propTypes = propTypes
export default withStyles(s)(PaletteColor)
