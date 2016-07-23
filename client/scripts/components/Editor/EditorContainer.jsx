import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { loadColors } from 'actions/editor'
import { generatePalette } from 'utils/color'
import { makeEditorSelector } from 'reducers/selectors'
import { Loader } from 'components/Loader/Loader'
import Editor from './Editor'

const propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
}

class EditorContainer extends Component {
  constructor(props) {
    super(props)
    this.generateColors = this.generateColors.bind(this)
  }

  componentDidMount() {
    const { params } = this.props
    this.generateColors(params.hex)
  }

  generateColors(colors = generatePalette()) {
    const { dispatch } = this.props
    dispatch(loadColors({ colors }))
  }

  render() {
    const { editor } = this.props

    return (
      editor && editor.hasLoaded
       ? <Editor {...this.props} generateColors={this.generateColors} />
       : <Loader />
    )
  }
}

EditorContainer.propTypes = propTypes
const makeMapStateToProps = () => (state) =>
  makeEditorSelector()(state)

export default connect(makeMapStateToProps)(EditorContainer)
