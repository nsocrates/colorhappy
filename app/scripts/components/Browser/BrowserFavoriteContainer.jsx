import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import BrowserFavoriteGroup from './BrowserFavoriteGroup'
import { Loader, PageController } from 'components/Loader'
import { makePaginatedUserFavoriteSelector } from 'reducers/selectors'
import { loadUserFavorites } from 'actions/users'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  // Palette Entity
  paletteEntity: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // Partitioned palettes
  palettes: PropTypes.object,
  session: PropTypes.object.isRequired,
}

class BrowserContainer extends Component {
  constructor(props) {
    super(props)
    this.handleLoadMorePalettes = this.handleLoadMorePalettes.bind(this)
    this.handleLoadUserFavorites = this.handleLoadUserFavorites.bind(this)
  }

  componentDidMount() {
    this.handleLoadUserFavorites(null, false)
  }

  // We pass this method to PageController.
  // Passing true as an argument to handleLoadUserFavorites forces fetching.
  handleLoadMorePalettes(e) {
    e.preventDefault()
    this.handleLoadUserFavorites(true)
  }

  handleLoadUserFavorites(isNext = false) {
    const { dispatch, session, palettes } = this.props
    dispatch(loadUserFavorites({
      id: session.id,
      options: {
        sort: 'title',
        page: palettes ? palettes.pageCount + 1 : 1,
        limit: 25,
      },
    }, isNext))
  }

  render() {
    const { paletteEntity, userEntity, palettes, dispatch } = this.props

    if (!palettes) return <Loader />

    return (
      <main className={s.container}>
        <h1>Favorites</h1>
        <div className={s.row}>
          {palettes.ids.map((id, i) => {
            const currPalette = paletteEntity[id]
            const user = userEntity[currPalette.user_id]
            return (
              <BrowserFavoriteGroup
                palette={currPalette}
                user={user}
                key={i}
                dispatch={dispatch}
              />
            )
          })}
        </div>
        <PageController pagination={palettes} onClick={this.handleLoadMorePalettes} />
      </main>
    )
  }
}

BrowserContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makePaginatedUserFavoriteSelector(
    'favoritesByUser',
    props.location.query.sort || 'title'
  )(state)

const WithStyles = withStyles(s)(BrowserContainer)
export default connect(makeMapStateToProps)(WithStyles)
