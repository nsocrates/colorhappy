/**
 * Logic for rendering Load Component
 */

import React, { PropTypes } from 'react'
import { Loader, LoadMore, EndResult } from './Loader'

const propTypes = {
  sorted: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default function BrowserLoader({ sorted, onClick }) {
  const { isFetching, startId, startKey } = sorted
  // Currently fetching
  if (isFetching) return <Loader />

  // Nothing remaining to fetch
  if (startId && startKey) return <EndResult />

  // Default
  return <LoadMore onClick={onClick} />
}

BrowserLoader.propTypes = propTypes
