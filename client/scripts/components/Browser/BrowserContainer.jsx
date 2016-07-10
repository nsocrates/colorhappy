import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import BrowserPaletteGroup from './BrowserPaletteGroup'
import Loader from 'components/Loader/Loader'
import { paletteArray } from 'actions/palettes'
import { makeBrowserSelector } from 'reducers/selectors'

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  palettes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  sorted: PropTypes.object.isRequired,
}

class BrowserContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, location } = this.props
    dispatch(paletteArray.request({ sort: location.query.sort || 'newest' }))
  }

  handleClick(e) {
    e.preventDefault()
  }

  render() {
    const { palettes, users, sorted, dispatch } = this.props

    return (
      <main className={s.main}>
      {sorted.isFetching
        ? <Loader containerStyle={{ paddingTop: '100px' }} />
        : sorted.ids.map((id, i) => {
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
      </main>
    )
  }
}

BrowserContainer.propTypes = propTypes

const makeMapStateToProps = () => {
  const browserSelector = makeBrowserSelector()
  const mapStateToProps = (state, props) => browserSelector(state, props)
  return mapStateToProps
}

const WithStyles = withStyles(s)(BrowserContainer)
export default connect(makeMapStateToProps)(WithStyles)
