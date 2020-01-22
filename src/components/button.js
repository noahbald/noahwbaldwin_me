import React from 'react'
import PropTypes from 'prop-types'
import { Button as RSButton } from 'reactstrap'

import Link from './link'

import './button.css'

/**
 * A clickable button which
 * `Button` is based on `Button` from `reactstrap`, for accessibility and base styles
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
    to,
    ...remainingProps
  } = props

  // Define button based on given props
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
  // If a url is given, wrap button in a link, otherwise continue and return normal button
  if (to) {
    return (
      <Link to={to} className="button-link">
        {button}
      </Link>
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
