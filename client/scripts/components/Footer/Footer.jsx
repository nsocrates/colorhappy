import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Footer.scss'
// import { Link } from 'react-router'

const propTypes = {
  children: PropTypes.node,
}

function Footer() {
  return (
    <footer className={s.footer}>
      <small>ColorMe.</small>
    </footer>
  )
}

Footer.propTypes = propTypes

export default withStyles(s)(Footer)
