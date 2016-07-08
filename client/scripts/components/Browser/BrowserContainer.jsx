import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import BrowserPaletteGroup from './BrowserPaletteGroup'
import { paletteArray } from 'actions/palettes'
import { browserSelector } from 'reducers/selectors'

const propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  palettes: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
}

class BrowserContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(paletteArray.request())
  }

  handleClick(e) {
    e.preventDefault()
  }

  render() {
    const { palettes, users } = this.props
    return (
      <main className={s.main}>
      {Object.keys(palettes).map((palette, i) => {
        const currPalette = palettes[palette]
        const user = users[currPalette.userId]
        return (
          <BrowserPaletteGroup
            palette={currPalette}
            user={user}
            key={i}
          />
        )
      })}
      </main>
    )
  }
}

BrowserContainer.propTypes = propTypes

const WithStyles = withStyles(s)(BrowserContainer)
export default connect(browserSelector)(WithStyles)
