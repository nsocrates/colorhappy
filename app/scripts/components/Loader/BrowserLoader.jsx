/**
 * Logic for rendering Load Component
 */

import React, { PropTypes } from 'react'
import { Loader, LoadMore, EndResult } from './Loader'

const propTypes = {
  pagination: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default function BrowserLoader({ pagination, onClick }) {
  const { isFetching, hasMore } = pagination
  // Currently fetching
  if (isFetching) return <Loader />

  // Nothing remaining to fetch
  if (!hasMore) return <EndResult />

  // Default
  return <LoadMore onClick={onClick} />
}

BrowserLoader.propTypes = propTypes
