import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../Browser.scss'
import { favorite } from 'actions/favorite'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  paletteId: PropTypes.string.isRequired,
  colorChain: PropTypes.string.isRequired,
}

function BrowserOverlay({ dispatch, paletteId, colorChain }) {
  return (
    <aside className={s.overlayContainer}>
      <div className={s.overlayRow}>
        <label
          className={s.overlayItem}
          onClick={() => dispatch(favorite.request({ id: paletteId }))}
        >
          {"Like"}
        </label>
        <Link className={s.overlayItem} to={`/palette/${paletteId}`}>{"View"}</Link>
        <a
          download
          className={s.overlayItem}
          href={`//localhost:8000/api/palettes/download/${colorChain}`}
        >
          {"Export"}
        </a>
      </div>
    </aside>
  )
}

BrowserOverlay.propTypes = propTypes

export default withStyles(s)(BrowserOverlay)
