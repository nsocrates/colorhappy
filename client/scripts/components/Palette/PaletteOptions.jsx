import React, { PropTypes } from 'react'
import s from './Palette.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'
import { Love, ModeEdit, Download } from 'components/Svg'

const propTypes = {
  allColors: PropTypes.array.isRequired,
}

function PaletteOptions({ allColors }) {
  const colors = allColors
    .map(color => `${color}-`)
    .join('')

  return (
    <ul className={s.optionList}>

      <li className={s.optionItem}>
        <a
          className={s.optionAction}
          href={`//localhost:8000/api/palettes/download/${colors}`}
          download
        >
          <Download className={s.optionIcon} />
          <span className={s.optionText}>
            {"Export"}
          </span>
        </a>
      </li>

      <li className={s.optionItem}>
        <Link className={s.optionAction} to={`/editor/${colors}`}>
          <ModeEdit className={s.optionIcon} />
          <span className={s.optionText}>
            {"Edit"}
          </span>
        </Link>
      </li>

      <li className={s.optionItem}>
        <label className={s.optionAction}>
          <Love className={s.optionIcon} />
          <span className={s.optionText}>
            {"Love"}
          </span>
        </label>
      </li>

    </ul>
  )
}

PaletteOptions.propTypes = propTypes
export default withStyles(s)(PaletteOptions)
