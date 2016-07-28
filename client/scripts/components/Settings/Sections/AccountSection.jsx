import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sections'
import { Email, Person } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import { disableAccount } from 'actions/users'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
}

class AccountSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.me.username,
      email: props.me.email,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDeactivate = this.handleDeactivate.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const payload = Object.keys(this.state).reduce((acc, key) => {
      acc[key] = acc[key].trim()
      return acc
    }, this.state)

    return payload
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({
      [e.target.getAttribute('data-controller')]: e.target.value,
    })
  }

  handleDeactivate(e) {
    e.preventDefault()
    this.props.dispatch(disableAccount.request())
  }

  render() {
    const { session } = this.props
    const isDisabled = {
      disabled: session.isUpdatingAccount,
    }

    return (
      <div className={s.container}>
        <form
          className={s.form}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >

          <FieldInput
            disabled
            label="Username"
            Icon={Person}
            data-controller="username"
            value={this.state.username}
          />

          <FieldInput
            disabled
            label="Email"
            Icon={Email}
            data-controller="email"
            value={this.state.email}
          />

          <div className={s.btnGroup}>

            <label className={s.deactivateBtn} onClick={this.handleDisable}>
              {"Deactivate Account"}
            </label>

            <button
              {...isDisabled}
              type="submit"
              className={s.formBtn}
            >
              {session.isUpdatingAccount ? 'Saving Changes...' : 'Save Changes'}
            </button>

          </div>
        </form>
      </div>
    )
  }
}

AccountSection.propTypes = propTypes

export default withStyles(s)(AccountSection)
