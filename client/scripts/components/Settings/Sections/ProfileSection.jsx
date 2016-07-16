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
}

class ProfileSection extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const payload = {
      name: this._name.value.trim(),
      location: this._location.value.trim(),
      website: this._website.value.trim(),
      bio: this._bio.value.trim(),
    }

    this.props.dispatch(updateProfile.request(payload))
  }
  render() {
    const { me } = this.props
    return (
      <div className={s.container}>
        <form className={s.form} onSubmit={this.handleSubmit}>

          <FieldInput
            label="Name"
            type="text"
            defaultValue={me.name}
            Icon={Person}
            reference={c => (this._name = c)}
          />

          <FieldInput
            label="Location"
            type="text"
            defaultValue={me.location}
            Icon={Location}
            reference={c => (this._location = c)}
          />

          <FieldInput
            label="Website"
            type="text"
            defaultValue={me.website}
            Icon={Web}
            reference={c => (this._website = c)}
          />

          <FieldTextArea
            label="Bio"
            defaultValue={me.bio}
            Icon={Create}
            reference={c => (this._bio = c)}
          />

          <button type="submit" className={s.formBtn__primary}>
            {"Save Changes"}
          </button>

        </form>
      </div>
    )
  }
}

ProfileSection.propTypes = propTypes

export default withStyles(s)(ProfileSection)
