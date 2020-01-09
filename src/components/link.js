/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Link as ReactLink } from 'react-router-dom'

import isProtocol from '../services/isProtocol'

/**
 * Returns an `a` anchor or `react-router-dom` `Link` depending on domain of `to`
 * @param {*} props
 */
export default function Link(props) {
  const {
    to,
    ...remainingProps
  } = props
  // If domain includes protocol return <a/>, otherwise return <Link/>
  const link = isProtocol(to) ? (
    <a href={to} {...remainingProps} />
  ) : (
    <ReactLink to={to} {...remainingProps} />
  )
  return link
}

Link.propTypes = ReactLink.PropTypes
Link.defaultProps = ReactLink.defaultProps
