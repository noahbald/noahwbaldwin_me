import React from 'react'
import PropTypes from 'prop-types'
import { Button as RSButton } from 'reactstrap'
import './button.css'

function Button(props) {
  const {
    outline,
    text,
    disabled,
    className,
  } = props
  let newClassName = 'button'
  if (outline) {
    newClassName += ' outline'
  } else if (text) {
    newClassName += ' text'
  }
  if (disabled) {
    newClassName += ' disabled'
  }
  if (className) {
    newClassName += ` ${className}`
  }
  return (
    <RSButton {...props} className={`${className} ${newClassName}`} />
  )
}

Button.propTypes = {
  outline: PropTypes.bool,
  text: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  outline: false,
  text: false,
  disabled: false,
  className: '',
}

export default Button
