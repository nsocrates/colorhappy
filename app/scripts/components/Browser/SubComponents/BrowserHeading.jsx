import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from '../Browser.scss'

const propTypes = {
  palette: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

function BrowserHeading({ palette, user }) {
  return (
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
  )
}

BrowserHeading.propTypes = propTypes

export default withStyles(s)(BrowserHeading)
