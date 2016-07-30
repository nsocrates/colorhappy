import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './UserTab.scss'
import { Link } from 'react-router'

const propTypes = {
  user: PropTypes.object,
}

function UserTab(props) {
  const { user } = props

  return (
    <aside className={s.container}>
      <article className={s.block__avatar}>
        <div className={s.avatarWrap}>
          <img
            className={s.avatar}
            src="https://api.adorable.io/avatars/150/abott@adorable.png" alt={user.username}
          />
        </div>
      </article>
      <article className={s.block__username}>
        <h5 className={s.username}>
          <Link className={s.link__inline} to={`/user/${user.id}`}>
            {user.username}
          </Link>
        </h5>
      </article>
      <article className={s.stats}>
        <div className={s.statsItem}>
          <strong className={s.strong}>
            {user.palette_count}
          </strong>
          {" Palettes"}
        </div>
        <div className={s.statsItem}>
          <strong className={s.strong}>
            {user.favorite_count}
          </strong>
          {" Favorites"}
        </div>
      </article>
    </aside>
  )
}

UserTab.propTypes = propTypes

export default withStyles(s)(UserTab)
