import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import {
  BrowserPalette,
  BrowserCounters,
  BrowserOverlay,
  BrowserHeading,
} from './SubComponents'

const propTypes = {
  palette: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
}

function BrowserPaletteGroup({ palette, user, dispatch }) {
  const colorChain = palette.colors
    .map(color => `${color}-`)
    .join('')

  return (
    <article className={s.column}>
      <header className={s.articleHeader}>
        <BrowserCounters viewCount={palette.view_count} favoriteCount={palette.favorite_count} />
        <BrowserHeading palette={palette} user={user} />
      </header>
      <section className={s.articleBody}>
        {palette.colors.map((color, i) =>
          <BrowserPalette color={color} key={`${color}_${i}`} />
        )}
        <BrowserOverlay colorChain={colorChain} dispatch={dispatch} paletteId={palette.id} />
      </section>
    </article>
  )
}

BrowserPaletteGroup.propTypes = propTypes

export default withStyles(s)(BrowserPaletteGroup)
