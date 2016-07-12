import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sections'
import { Lock, Eye } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import { changePassword } from 'actions/users'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
}

class AccountSection extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const payload = {
      password: this._password.value,
      newPassword: this._newPassword.value,
    }

    this.props.dispatch(changePassword.request(payload))
  }
  render() {
    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit}>

          <FieldInput
            type="password"
            label="Current Password"
            Icon={Lock}
            RightIcon={Eye}
            reference={c => (this._password = c)}
          />

          <FieldInput
            type="password"
            label="New Password"
            Icon={Lock}
            RightIcon={Eye}
            reference={c => (this._newPassword = c)}
          />

          <button type="submit" className={s.submitBtn}>
            {"Change Password"}
          </button>

        </form>
      </div>
    )
  }
}

AccountSection.propTypes = propTypes

export default withStyles(s)(AccountSection)
