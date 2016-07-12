import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Settings.scss'
import Tabs from './Tabs/Tabs'
import ProfileSection from './Sections/ProfileSection'
import AccountSection from './Sections/AccountSection'

const CONTENT_BODY = {
  '#profile': ProfileSection,
  '#account': AccountSection,
  '#password': AccountSection,
}

const propTypes = {
  location: PropTypes.object,
}

function Settings(props) {
  const { location } = props
  const ContentBody = CONTENT_BODY[location.hash] || ProfileSection

  return (
    <main className={s.container}>

      <heading className={s.pageHeading}>
        <h4 className={s.pageHeader}>
          {"Settings"}
        </h4>
      </heading>

      <Tabs location={location} />

      <ContentBody {...props} />
    </main>
  )
}

Settings.propTypes = propTypes

export default withStyles(s)(Settings)
