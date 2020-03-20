/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import PropTypes from 'prop-types'

import Link from './link'

import './button.css'

/**
 * A clickable button.
 * Returns a button-like link if `to` is given
 * @param {*} props { `type`, `className`, `icon`, `children`, `to`, `...remainingProps` }
 * @example
 * <Button
 *  type="outline"
 *  className="main-button"
 *  icon={buttonIcon}
 * >
 *  Click Me!
 * </Button>
 */
function Button(props) {
  const {
    type,
    className,
    icon,
    children,
    ...remainingProps
  } = props

  // Define button based on given props
  const iconElement = (
    icon ? (
      <div className="icon" style={{ backgroundImage: `url(${icon})` }} />
    ) : (
      null
    )
  )
  let button
  if (remainingProps.to) {
    button = (
      <Link {...remainingProps} className={`button ${className} ${type} ${icon ? 'icon' : ''}`}>
        {iconElement}
        {children}
      </Link>
    )
  } else {
    button = (
      // eslint-disable-next-line react/button-has-type
      <button {...remainingProps} className={`button ${className} ${type} ${icon ? 'icon' : ''}`}>
        {iconElement}
        {children}
      </button>
    )
  }
  return button
}

Button.propTypes = {
  /**
   * Style of button
   */
  type: PropTypes.oneOf([
    'outline',
    'text',
    'disabled',
    '',
  ]),
  /**
   * Optional class for button element
   */
  className: PropTypes.string,
  /**
   * Image to display within button
   */
  icon: PropTypes.string,
  /**
   * Children of button
   */
  children: PropTypes.node,
  /**
   * url for button linking to different pages/resources
   */
  to: PropTypes.string,
}

Button.defaultProps = {
  type: '',
  className: '',
  icon: '',
  children: null,
  to: '',
}

export default Button
