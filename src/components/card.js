import React from 'react'
import PropTypes from 'prop-types'
import Link from './link'

import './card.css'

export default function Card(props) {
  const { className, children, to } = props

  let link = null
  if (to || to === '') {
    link = <Link to={to} tabIndex="-1" className="card-highlight" />
  }

  return (
    <div className={`card ${className}`}>
      {children}
      {link}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string,
}

Card.defaultProps = {
  className: '',
  children: null,
  to: undefined,
}
