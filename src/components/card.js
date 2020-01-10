import React from 'react'
import PropTypes from 'prop-types'
import Link from './link'

import './card.css'

/**
 * A styled box for presenting text or other content
 * @param {*} props { `className`, `children`, `to`}
 * @example
 * <Card
 *  className="example-card"
 *  to="/"
 * >
 *  <p>This is an example of the Card component!</p>
 * </Card>
 */
export default function Card(props) {
  const { className, children, to } = props

  // If url is given create a link bar to display at bottom of `Card`
  // otherwise leave as null so that it doesn't render
  let link = null
  if (to || to === '') {
    link = <Link to={to} tabIndex="-1" className="card-highlight" />
  }

  // Render cards with content
  return (
    <div className={`card ${className}`}>
      {children}
      {link}
    </div>
  )
}

Card.propTypes = {
  /**
   * Optional class for `Card` element
   */
  className: PropTypes.string,
  /**
   * Content to render within `Card`
   */
  children: PropTypes.node,
  /**
   * Optional url for Card to link to
   */
  to: PropTypes.string,
}

Card.defaultProps = {
  className: '',
  children: null,
  to: undefined,
}
