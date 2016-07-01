import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Header.scss'
import { Link } from 'react-router'

const propTypes = {
  children: PropTypes.node,
}

function Header() {
  return (
    <header className={s.header}>
      <section className={s.sectionLeft}>
        <h2 className={s.title}>
          <Link className={s.link} to="/">
            <strong>ColorMe</strong>
          </Link>
        </h2>
        <p className={s.description}>
          <small>
            <strong>Explore</strong>,
            <strong> create</strong>, and
            <strong> save</strong> your palettes.
          </small>
        </p>
      </section>
      <section className={s.sectionRight}>
        <Link className={s.login} to="/">Login</Link>
      </section>
    </header>
  )
}

Header.propTypes = propTypes

export default withStyles(s)(Header)
