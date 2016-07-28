import React, { PropTypes, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Sections'
import { Person, Location, Web, Create } from 'components/Svg'
import FieldInput from 'components/Form/FieldInput'
import FieldTextArea from 'components/Form/FieldTextArea'
import { updateProfile } from 'actions/users'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
}

class ProfileSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      full_name: props.me.full_name,
      loc: props.me.loc,
      website: props.me.website,
      bio: props.me.bio,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const payload = Object.keys(this.state).reduce((acc, key) => {
      acc[key] = acc[key].trim()
      return acc
    }, this.state)

    this.props.dispatch(updateProfile.request(payload))
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({
      [e.target.getAttribute('data-controller')]: e.target.value,
    })
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
            label="Name"
            type="text"
            data-controller="full_name"
            value={this.state.full_name}
            Icon={Person}
          />

          <FieldInput
            label="Location"
            type="text"
            data-controller="loc"
            value={this.state.loc}
            Icon={Location}
          />

          <FieldInput
            label="Website"
            type="text"
            data-controller="website"
            value={this.state.website}
            Icon={Web}
          />

          <FieldTextArea
            label="Bio"
            data-controller="bio"
            value={this.state.bio}
            Icon={Create}
          />

          <div className={s.btnGroup}>
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

ProfileSection.propTypes = propTypes

export default withStyles(s)(ProfileSection)
