import React, { PropTypes } from 'react'
import s from './Snackbar.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { notif as notification } from 'actions/notifications'

const propTypes = {
  notif: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function SnackbarMessages({ notif, dispatch }) {
  const handleClick = e => {
    e.preventDefault()
    dispatch(notification.destroy({ id: notif.id }))
  }
  return (
    <div>
      <span className={s.message}>
        {notif.message}
      </span>
      <label className={s.action} onClick={handleClick}>
        {notif.action}
      </label>
    </div>
  )
}

SnackbarMessages.propTypes = propTypes

export default withStyles(s)(SnackbarMessages)
