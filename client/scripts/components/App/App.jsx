import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './App.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

class App extends React.Component {
  componentDidMount() {
    // ...
  }

  componentWillUnmount() {
    // ...
  }

  render() {
    const { children } = this.props

    return (
      <div className={s.app}>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
}

App.defaultProps = {
  children: null,
}

function mapStateToProps(state) {
  return { state }
}

const AppWithStyles = withStyles(s)(App)
export default connect(mapStateToProps)(AppWithStyles)
