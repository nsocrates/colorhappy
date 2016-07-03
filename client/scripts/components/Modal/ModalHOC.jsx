import React, { Component, PropTypes } from 'react'

const initialState = { savedChildren: null, previousChildren: null, isModal: false }

const ModalHOC = WrappedComponent => class extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps
    if (location.key !== this.props.location.key
      && location.state
      && location.state.isModal
    ) {
      if (location.state.retainChildren) {
        this.setState({
          savedChildren: this.state.savedChildren
            ? this.state.savedChildren
            : this.state.previousChildren || this.props.children,
          previousChildren: this.props.children,
          isModal: true,
        })
      } else {
        this.setState({
          savedChildren: null,
          previousChildren: this.props.children,
          isModal: true,
        })
      }
    } else {
      this.setState(initialState)
    }
  }

  render() {
    const { children } = this.props
    const { previousChildren, isModal, savedChildren } = this.state
    return (
      <WrappedComponent
        {...this.props}
        prevOrCurrChildren={isModal ? (savedChildren || previousChildren) : children}
        modalChildren={isModal && children}
      />
    )
  }
}

export default ModalHOC
