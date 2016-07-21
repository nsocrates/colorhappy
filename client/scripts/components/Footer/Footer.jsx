import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Footer.scss'

const propTypes = {
  children: PropTypes.node,
}

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <span>
          {"ColorHappy"}
        </span>
        <span>{" | "}</span>
        <a className={s.link} href="https://github.com/nsocrates/colorhappy">
          {"View Source"}
        </a>
      </div>
    </footer>
  )
}

Footer.propTypes = propTypes

export default withStyles(s)(Footer)
