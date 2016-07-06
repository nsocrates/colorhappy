import React, { Component, PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Link } from 'react-router'
import s from './Browser.scss'
import PaletteColor from './PaletteColor'
import { Love, Eye } from 'components/Svg'

const propTypes = {
  children: PropTypes.node,
  colors: PropTypes.array,
  user: PropTypes.string,
  viewCount: PropTypes.string,
  loveCount: PropTypes.string,
  title: PropTypes.string,
}

class PaletteGroup extends Component {
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
      colors,
      user,
      viewCount,
      loveCount,
      title,
    } = this.props

    return (
      <article className={s.paletteGroup}>
        <heading className={s.articleHeading}>
          <section className={s.articleHeadingLeft}>
            <h5 className={s.title}>
              <Link className={s.titleLink}to="/">
                {title}
              </Link>
            </h5>
            <small className={s.letterSpace}>
              {"by"}
            </small>
            <Link className={s.user} to="/">
              {user}
            </Link>
          </section>
          <aside className={s.articleHeadingRight}>
            <span className={s.countGroup}>
              <span className={s.count}>
                {`${viewCount} `}
              </span>
              <Eye className={s.countIcon} />
            </span>
            <span className={s.countGroup}>
              <span className={s.count}>
                {`${loveCount} `}
              </span>
              <Love className={s.countIcon} />
            </span>
          </aside>
        </heading>
        <section className={s.articleBody}>
          <ul className={s.colorGroup}>
            {colors.map((color, i) =>
              <PaletteColor color={color} key={`${color}_${i}`} />
            )}
          </ul>
          <aside
            className={s.overlay}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            <Link className={s.overlayItem} to="/">Love</Link>
            <Link className={s.overlayItem} to="/">View</Link>
            <Link className={s.overlayItem} to="/">Export</Link>
          </aside>
        </section>
      </article>
    )
  }
}

PaletteGroup.propTypes = propTypes

export default withStyles(s)(PaletteGroup)
