import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './App.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ModalHOC from 'components/Modal/ModalHOC'

class App extends React.Component {
  static oldChildren = this
  componentDidMount() {
    // ...
  }

  componentWillUnmount() {
    // ...
  }

  render() {
    const { prevOrCurrChildren, modalChildren, location } = this.props

    return (
      <div className={s.app}>
        <Header location={location} />
        {prevOrCurrChildren}
        {modalChildren}
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  prevOrCurrChildren: PropTypes.node.isRequired,
  modalChildren: PropTypes.node,
  oldChildren: PropTypes.node,
}

App.defaultProps = {
  modalChildren: null,
}

function mapStateToProps(state) {
  return { state }
}

const AppModal = ModalHOC(App)
const AppWithStyles = withStyles(s)(AppModal)
export default connect(mapStateToProps)(AppWithStyles)
