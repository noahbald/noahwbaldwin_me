import React from 'react'
import PropTypes from 'prop-types'

import Link from './link'

import './external-links.css'

/**
 * @param {*} props
 * @example
 * <ExternalLink
 *  href={href}
 *  title={title}
 * >
 *  <svg />
 * </ExternalLink>
 */
export function ExternalLink(props) {
  const { href, title, children } = props
  return (
    <Link
      to={href}
      title={title}
      rel="external nofollow"
      target="_blank"
    >
      {children}
    </Link>
  )
}

ExternalLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
}

ExternalLink.defaultProps = {
  href: '',
  title: '',
  children: null,
}

/**
 * A container for one or more `ExternalLink`
 * @param {*} props 
 * @example
 * <ExternalLinks>
 *  <ExternalLink />
 * </ExternalLinks>
 */
export default function ExternalLinks(props) {
  const { children } = props
  return (
    <div className="external-links">
      {children}
    </div>
  )
}

ExternalLinks.propTypes = {
  children: PropTypes.instanceOf(ExternalLink),
}

ExternalLinks.defaultProps = {
  children: null,
}