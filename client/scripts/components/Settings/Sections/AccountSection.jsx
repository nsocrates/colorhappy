import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sections'
import { Email, Person } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import { disableAccount } from 'actions/users'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired,
}

class AccountSection extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDisable = this.handleDisable.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleDisable(e) {
    e.preventDefault()
    this.props.dispatch(disableAccount.request())
  }

  render() {
    const { me } = this.props
    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit}>

          <FieldInput
            disabled
            label="Username"
            Icon={Person}
            defaultValue={me.username}
          />

          <FieldInput
            label="Email"
            Icon={Email}
            defaultValue={me.email}
            reference={c => (this._email = c)}
          />

          <div className={s.btnGroup}>

            <label className={s.deactivateBtn} onClick={this.handleDisable}>
              {"Deactivate Account"}
            </label>

            <button type="submit" className={s.formBtn}>
              {"Save Changes"}
            </button>

          </div>
        </form>
      </div>
    )
  }
}

AccountSection.propTypes = propTypes

export default withStyles(s)(AccountSection)
