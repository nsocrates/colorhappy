import React, { PropTypes } from 'react'
import { Love, Eye } from 'components/Svg'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../Browser.scss'

const propTypes = {
  favoriteCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  viewCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

function BrowserCounters({ favoriteCount, viewCount }) {
  return (
    <aside className={s.articleHeadingRight}>
      <span className={s.countGroup}>
        <span className={s.count}>
          {`${viewCount} `}
        </span>
        <Eye className={s.countIcon} />
      </span>
      <span className={s.countGroup}>
        <span className={s.count}>
          {`${favoriteCount} `}
        </span>
        <Love className={s.countIcon} />
      </span>
    </aside>
  )
}

BrowserCounters.propTypes = propTypes

export default withStyles(s)(BrowserCounters)
