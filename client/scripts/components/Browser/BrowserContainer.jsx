import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import BrowserPaletteGroup from './BrowserPaletteGroup'
import { Loader, BrowserLoader } from 'components/Loader'
import { paletteArray } from 'actions/palettes'
import { makeBrowserSelector } from 'reducers/selectors'

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  // Palette Entity
  palettes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // Partitioned palettes
  sorted: PropTypes.object.isRequired,
}

class BrowserContainer extends Component {
  constructor(props) {
    super(props)
    this.handleLoadMorePalettes = this.handleLoadMorePalettes.bind(this)
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    const sort = this.switchSort(location.query.sort)

    dispatch(paletteArray.request({ sort }))
  }

  handleLoadMorePalettes(e) {
    e.preventDefault()
    const { dispatch, sorted } = this.props
    dispatch(paletteArray.request({
      sort: '-createdAt',
      startId: sorted.startId,
      startKey: sorted.startKey,
    }))
  }

  switchSort(sort) {
    switch (sort) {
      case 'newest':
      default:
        return '-createdAt'
    }
  }

  render() {
    const { palettes, users, sorted, dispatch } = this.props

    if (!sorted.ids.length) return <Loader />

    return (
      <main className={s.container}>
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
}

BrowserContainer.propTypes = propTypes

const makeMapStateToProps = () => (state, props) =>
  makeBrowserSelector()(state, props.location.query.sort)

const WithStyles = withStyles(s)(BrowserContainer)
export default connect(makeMapStateToProps)(WithStyles)
