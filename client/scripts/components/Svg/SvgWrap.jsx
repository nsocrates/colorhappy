import React, { PropTypes } from 'react'

export default function SvgWrap({ children, style, viewBox = '0 0 24 24', ...rest }) {
  const styles = {
    display: 'inline-block',
    width: '1em',
    height: '1em',
    fill: 'currentColor',
  }
  return (
    <svg
      {...rest}
      viewBox={viewBox}
      style={Object.assign({}, styles, style)}
    >
      {children}
    </svg>
  )
}

SvgWrap.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  viewBox: PropTypes.string,
}
