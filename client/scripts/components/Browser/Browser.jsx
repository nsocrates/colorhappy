import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Browser.scss'
import PaletteGroup from './PaletteGroup'

const propTypes = {
  children: PropTypes.node,
}

class Browser extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
  }

  render() {
    const seed = [{
      id: 123456,
      title: 'Lambs on Doors',
      colors: ['DD002C', 'DD8395', 'DDC9A7', '958871', '533817'],
      user: { name: 'sababa23' },
      viewCount: '24',
      loveCount: '5',
    }, {
      id: 123456,
      title: 'Caroline Matilda',
      colors: ['5B503E', 'A19472', 'C8C0AD', 'C29379', '7A97A5'],
      user: { name: 'Alandree' },
      viewCount: '107',
      loveCount: '34',
    }, {
      id: 123456,
      title: 'i demand a pancake',
      colors: ['594F4F', '547980', '45ADA8', '9DE0AD', 'E5FCC2'],
      user: { name: 'alpen' },
      viewCount: '56',
      loveCount: '1',
    }, {
      id: 123456,
      title: 'Giant Goldfish',
      colors: ['69D2E7', 'A7DBD8', 'E0E4CC', 'F38630', 'FA6900'],
      user: { name: 'manekineko' },
      viewCount: '9',
      loveCount: '2',
    }, {
      id: 123456,
      title: 'let them eat cake',
      colors: ['774F38', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC'],
      user: { name: 'lunalein' },
      viewCount: '12',
      loveCount: '0',
    }]

    return (
      <main className={s.main}>
      {seed.map((item, i) =>
        <PaletteGroup {...item} key={i} />
      )}
      </main>
    )
  }
}

Browser.propTypes = propTypes

function mapStateToProps(state) {
  return {
    state,
  }
}

const withStylesBrowser = withStyles(s)(Browser)
export default connect(mapStateToProps)(withStylesBrowser)
