import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

function Button(props) {
  const {
    outline,
    text,
    disabled,
    className,
    children,
    onClick,
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
    <button
      className={newClassName}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  outline: PropTypes.bool,
  text: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  outline: false,
  text: false,
  disabled: false,
  className: '',
  children: null,
  onClick: () => {},
}

export default Button
