import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Loader.scss'

const loaderPropTypes = {
  loaderStyle: PropTypes.object,
  containerStyle: PropTypes.object,
}

const loadMorePropTypes = {
  onClick: PropTypes.func,
}

function _Loader({ loaderStyle, containerStyle }) {
  return (
    <div className={s.loaderWrap} style={containerStyle}>
      <div className={s.loaderIcon} style={loaderStyle} />
    </div>
  )
}

function _LoadMore(props) {
  return (
    <aside className={s.loadMoreWrap}>
      <button className={s.loadMoreBtn} onClick={props.onClick}>
        {"Load More"}
      </button>
    </aside>
  )
}

function _EndResult() {
  return <h4 className={s.endResult}>{"No More Palettes to Display."}</h4>
}

_Loader.propTypes = loaderPropTypes
_LoadMore.propTypes = loadMorePropTypes

export const Loader = withStyles(s)(_Loader)
export const LoadMore = withStyles(s)(_LoadMore)
export const EndResult = withStyles(s)(_EndResult)

