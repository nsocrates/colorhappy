import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { changeColor, loadColors } from 'actions/editor'
import { generatePalette } from 'utils/color'
import { makeEditorSelector } from 'reducers/selectors'
import Loader from 'components/Loader/Loader'
import Editor from './Editor'

const propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
}

class EditorContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { params, dispatch } = this.props
    const colors = params.hex || generatePalette()
    dispatch(loadColors({ colors }))
  }

  handleClick(e) {
    e.preventDefault()
    this.props.dispatch(changeColor.hex({ namespace: 'color1', value: '#fff' }))
  }

  render() {
    const { editor } = this.props

    return (
      editor && editor.hasLoaded
       ? <Editor {...this.props} />
       : <Loader containerStyle={{ paddingTop: '100px' }} />
    )
  }
}

EditorContainer.propTypes = propTypes
const makeMapStateToProps = () => (state) =>
  makeEditorSelector()(state)

export default connect(makeMapStateToProps)(EditorContainer)
