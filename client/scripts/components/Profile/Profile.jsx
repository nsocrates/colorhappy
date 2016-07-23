import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Profile.scss'
import ProfileHeader from './ProfileHeader'
import BrowserPaletteGroup from 'components/Browser/BrowserPaletteGroup'
import { BrowserLoader } from 'components/Loader'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function Profile(props) {
  const { sorted, palettes, users, dispatch } = props
  return (
    <main className={s.container}>
      <div className={s.row__banner}>
        <ProfileHeader />
      </div>
      <div className={s.row}>
        {sorted.ids.map((id, i) => {
          const currPalette = palettes[id]
          const user = users[currPalette.userId]
          return (
            <BrowserPaletteGroup
              palette={currPalette}
              user={user}
              key={i}
              dispatch={dispatch}
            />
          )
        })}
      </div>
      <BrowserLoader sorted={sorted} onClick={this.handleLoadMorePalettes} />
    </main>
  )
}

Profile.propTypes = propTypes

export default withStyles(s)(Profile)
