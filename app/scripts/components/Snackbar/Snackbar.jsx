import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Snackbar.scss'
import SnackbarMessages from './SnackbarMessages'

const propTypes = {
  notifications: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function Snackbar({ notifications, dispatch }) {
  const [notif] = notifications
  return (
    <aside className={notifications.length ? s.container__on : s.container__off}>
      {notif && <SnackbarMessages dispatch={dispatch} notif={notif} />}
    </aside>
  )
}

Snackbar.propTypes = propTypes

export default withStyles(s)(Snackbar)
