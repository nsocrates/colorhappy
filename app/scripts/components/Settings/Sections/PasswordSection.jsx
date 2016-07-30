import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sections'
import { Lock, Eye } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import { changePassword } from 'actions/users'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
}

class PasswordSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      old_password: '',
      new_password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.getAttribute('data-controller')]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.dispatch(changePassword.request(this.state))
  }
  render() {
    const { session } = this.props
    const isDisabled = {
      disabled: session.isUpdatingAccount,
    }

    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit} onChange={this.handleChange}>

          <FieldInput
            value={this.state.old_password}
            data-controller="old_password"
            type="password"
            label="Current Password"
            Icon={Lock}
            RightIcon={Eye}
          />

          <FieldInput
            value={this.state.new_password}
            data-controller="new_password"
            type="password"
            label="New Password"
            Icon={Lock}
            RightIcon={Eye}
          />

          <div className={s.btnGroup}>
            <button
              {...isDisabled}
              type="submit"
              className={s.formBtn}
            >
              {session.isUpdatingAccount ? 'Saving Changes...' : 'Change Password'}
            </button>
          </div>

        </form>
      </div>
    )
  }
}

PasswordSection.propTypes = propTypes

export default withStyles(s)(PasswordSection)
