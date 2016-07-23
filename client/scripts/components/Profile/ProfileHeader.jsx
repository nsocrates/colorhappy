import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Profile.scss'

function ProfileHeader(props) {
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
            {"UsernameHere"}
          </h4>
        </li>
        <li className={s.info}>
          {"Palettes: "}
          <strong>
            {"26"}
          </strong>
        </li>
        <li className={s.info}>
          {"Favorites: "}
          <strong>
            {"12"}
          </strong>
        </li>
      </ul>
    </header>
  )
}

export default withStyles(s)(ProfileHeader)
