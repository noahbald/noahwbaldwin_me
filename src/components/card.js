import React from 'react'
import PropTypes from 'prop-types'

import './card.css'

export default function Card(props) {
  const { className, children } = props
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

Card.defaultProps = {
  className: '',
  children: null,
}
