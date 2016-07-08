import React, { Component } from 'react'

const LoaderHOC = (ComposedComponent, objPath, isFetching = false) => class extends Component {
  render() {
    return (
      !Object.keys(this.props[objPath]).length || isFetching
        ? <h1>Loading...</h1>
        : <ComposedComponent {...this.props} />
    )
  }
}

export default LoaderHOC
