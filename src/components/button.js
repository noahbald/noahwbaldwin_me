import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button as RSButton } from 'reactstrap'
import './button.css'

function Button(props) {
  const {
    type,
    className,
    icon,
    children,
    to,
    ...remainingProps
  } = props

  const button = (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RSButton {...remainingProps} className={`button ${className} ${type} ${icon ? 'icon' : ''}`}>
      {icon ? (
        <div className="icon" style={{ backgroundImage: `url(${icon})` }} />
      ) : (
        null
      )}
      {children}
    </RSButton>
  )
  if (to) {
    return (
      <Link to={to}>
        {button}
      </Link>
    )
  }
  return button
}

Button.propTypes = {
  type: PropTypes.oneOf([
    'outline',
    'text',
    'disabled',
    '',
  ]),
  className: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
}

Button.defaultProps = {
  type: '',
  className: '',
  icon: '',
  children: null,
}

export default Button
