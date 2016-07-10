import React, { Component, PropTypes } from 'react'
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

class BrowserPaletteGroup extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
  }

  handleMouseOver(e) {
    e.currentTarget.style.opacity = '1'
  }

  handleMouseOut(e) {
    e.currentTarget.style.opacity = ''
  }

  render() {
    const {
      palette,
      user,
      dispatch,
    } = this.props

    return (
      <article className={s.BrowserPaletteGroup}>
        <heading className={s.articleHeading}>
          <section className={s.articleHeadingLeft}>
            <h5 className={s.title}>
              <Link className={s.titleLink} to={`/palette/${palette.id}`}>
                {palette.title}
              </Link>
            </h5>
            <small className={s.letterSpace}>
              {"by"}
            </small>
            <Link className={s.user} to="/">
              {user.username}
            </Link>
          </section>
          <aside className={s.articleHeadingRight}>
            <span className={s.countGroup}>
              <span className={s.count}>
                {`${palette.viewCount} `}
              </span>
              <Eye className={s.countIcon} />
            </span>
            <span className={s.countGroup}>
              <span className={s.count}>
                {`${palette.loveCount} `}
              </span>
              <Love className={s.countIcon} />
            </span>
          </aside>
        </heading>
        <section className={s.articleBody}>
          <ul className={s.colorGroup}>
            {palette.colors.map((color, i) =>
              <BrowserPalette color={color} key={`${color}_${i}`} />
            )}
          </ul>
          <aside
            className={s.overlay}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            <label
              className={s.overlayItem}
              onClick={() => dispatch(paletteLove.request({ id: palette.id }))}
            >
              {"Love"}
            </label>
            <Link className={s.overlayItem} to={`/palette/${palette.id}`}>{"View"}</Link>
            <label className={s.overlayItem} to="/">{"Export"}</label>
          </aside>
        </section>
      </article>
    )
  }
}

BrowserPaletteGroup.propTypes = propTypes

export default withStyles(s)(BrowserPaletteGroup)
