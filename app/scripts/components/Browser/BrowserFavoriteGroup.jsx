import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import { BrowserPalette, BrowserHeading } from './SubComponents'
import { Link } from 'react-router'
import { Close } from 'components/Svg'
import { unfavorite } from 'actions/favorite'

const propTypes = {
  palette: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function BrowserFavoriteGroup({ palette, user, dispatch }) {
  // Dispatches an action to remove a palette from favorites.
  function handleUnfavorite(e) {
    e.preventDefault()
    dispatch(unfavorite.request({ id: palette.id }))
  }

  return (
    <article className={s.column}>
      <header className={s.articleHeader}>
        <BrowserHeading palette={palette} user={user} />
      </header>
      <div className={s.paletteWrap}>
        <Link className={s.articleBody} to={`/palette/${palette.id}`}>
          {palette.colors.map((color, i) =>
            <BrowserPalette color={color} key={`${color}_${i}`} />
          )}
        </Link>
        <button className={s.deleteBtn} onClick={handleUnfavorite}>
          <Close className={s.deleteIcon} />
        </button>
      </div>
    </article>
  )
}

BrowserFavoriteGroup.propTypes = propTypes

export default withStyles(s)(BrowserFavoriteGroup)
