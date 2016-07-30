import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import BrowserPaletteGroup from './BrowserPaletteGroup'
import { Loader, BrowserLoader } from 'components/Loader'
import { loadPalettes } from 'actions/palettes'
import { makePaginatedPaletteUserSelector } from 'reducers/selectors'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  // Palette Entity
  paletteEntity: PropTypes.object.isRequired,
  userEntity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // Partitioned palettes
  palettes: PropTypes.object,
}

class BrowserContainer extends Component {
  constructor(props) {
    super(props)
    this.handleLoadMorePalettes = this.handleLoadMorePalettes.bind(this)
  }

  componentDidMount() {
    this.handleLoadMorePalettes(null, false)
  }

  handleLoadMorePalettes(e, isNext = true) {
    if (e) e.preventDefault()
    const { dispatch, location, palettes } = this.props
    dispatch(loadPalettes({
      sort: location.query.sort || 'created_at',
      page: palettes ? palettes.pageCount + 1 : 1,
      limit: 3,
    }, isNext))
  }

  render() {
    const { paletteEntity, userEntity, palettes, dispatch } = this.props

    if (!palettes) return <Loader />

    return (
      <main className={s.container}>
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
}

BrowserContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makePaginatedPaletteUserSelector(
    'palettesBySortOrder',
    props.location.query.sort || 'created_at'
  )(state)

const WithStyles = withStyles(s)(BrowserContainer)
export default connect(makeMapStateToProps)(WithStyles)
