import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Loader.scss'

const propTypes = {
  loaderStyle: PropTypes.object,
  containerStyle: PropTypes.object,
}

function Loader({ loaderStyle, containerStyle }) {
  const containerStyles = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
  const loaderStyles = {
    width: '30px',
    height: '30px',
    borderRadius: '2px',
    backgroundColor: '#37373a',
    boxShadow: '0 0 3px rgba(0,0,0,0.156863), 0 0 3px rgba(0,0,0,0.227451)',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return (
    <div style={Object.assign({}, containerStyles, containerStyle)}>
      <div className={s.loader} style={Object.assign({}, loaderStyles, loaderStyle)} />
    </div>
  )
}

Loader.propTypes = propTypes

export default withStyles(s)(Loader)
