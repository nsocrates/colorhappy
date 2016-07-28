import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Profile.scss'

const propTypes = {
  user: PropTypes.object.isRequired,
}

function ProfileHeader({ user }) {
  return (
    <header className={s.banner}>
      <section className={s.cell__avatar}>
        <div className={s.avatarWrap}>
          <img
            className={s.avatar}
            src="http://lorempixel.com/150/150/people/" alt="NAME_HERE"
          />
        </div>
      </section>
      <ul className={s.cell}>
        <li className={s.info}>
          <h4 className={s.infoHeading}>
            {user.username}
          </h4>
        </li>
        <li className={s.info}>
          <strong className={s.strong}>
            {user.palette_count}
          </strong>
          {" Palettes"}
        </li>
        <li className={s.info}>
          <strong className={s.strong}>
            {user.favorite_count}
          </strong>
          {" Favorites"}
        </li>
      </ul>
    </header>
  )
}

ProfileHeader.propTypes = propTypes
export default withStyles(s)(ProfileHeader)
