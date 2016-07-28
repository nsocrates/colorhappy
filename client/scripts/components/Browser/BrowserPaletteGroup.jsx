import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'
import s from './Browser.scss'
import BrowserPalette from './BrowserPalette'
import { Love, Eye } from 'components/Svg'
import { paletteLove } from 'actions/palettes'

const propTypes = {
  palette: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func,
}

function BrowserPaletteGroup({ palette, user, dispatch }) {
  const colors = palette.colors
    .map(color => `${color}-`)
    .join('')

  return (
    <article className={s.column}>
      <heading className={s.articleHeading}>
        <aside className={s.articleHeadingRight}>
          <span className={s.countGroup}>
            <span className={s.count}>
              {`${palette.view_count} `}
            </span>
            <Eye className={s.countIcon} />
          </span>
          <span className={s.countGroup}>
            <span className={s.count}>
              {`${palette.favorite_count} `}
            </span>
            <Love className={s.countIcon} />
          </span>
        </aside>
        <section className={s.articleHeadingLeft}>
          <h5 className={s.textWrap__title}>
            <Link className={s.titleLink} to={`/palette/${palette.id}`}>
              {palette.title}
            </Link>
          </h5>
          <div className={s.textWrap__small}>
            <span className={s.textSpacer}>{"by"}</span>
            <Link className={s.user} to={`/user/${user.id}`}>
              {user.username}
            </Link>
          </div>
        </section>
      </heading>
      <section className={s.articleBody}>
        {palette.colors.map((color, i) =>
          <BrowserPalette color={color} key={`${color}_${i}`} />
        )}
        <aside className={s.overlayContainer}>
          <div className={s.overlayRow}>
            <label
              className={s.overlayItem}
              onClick={() => dispatch(paletteLove.request({ id: palette.id }))}
            >
              {"Like"}
            </label>
            <Link className={s.overlayItem} to={`/palette/${palette.id}`}>{"View"}</Link>
            <a
              download
              className={s.overlayItem}
              href={`//localhost:8000/api/palettes/download/${colors}`}
            >
              {"Export"}
            </a>
          </div>
        </aside>
      </section>
    </article>
  )
}

BrowserPaletteGroup.propTypes = propTypes

export default withStyles(s)(BrowserPaletteGroup)
