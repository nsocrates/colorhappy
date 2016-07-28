import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Profile.scss'
import ProfileHeader from './ProfileHeader'
import BrowserPaletteGroup from 'components/Browser/BrowserPaletteGroup'
import { BrowserLoader } from 'components/Loader'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  userEntity: PropTypes.object.isRequired,
  paletteEntity: PropTypes.object.isRequired,
  palettes: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
}

function Profile(props) {
  const { palettes, dispatch, userEntity, paletteEntity, params } = props
  return (
    <main className={s.container}>
      <div className={s.row__banner}>
        <ProfileHeader user={userEntity[params.id]} />
      </div>
      <div className={s.row}>
        {palettes.ids.map((id, i) => {
          const currPalette = paletteEntity[id]
          const user = userEntity[currPalette.user_id]
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
      <BrowserLoader pagination={palettes} onClick={this.handleLoadMorePalettes} />
    </main>
  )
}

Profile.propTypes = propTypes

export default withStyles(s)(Profile)
