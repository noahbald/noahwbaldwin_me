import React from 'react'

import Card from './card'
import Button from './button'

import './header.scss'

export interface HeaderProps {
  heading?: string
  src?: string
  title?: string
  subtitle?: string
  callToAction?: React.ReactElement<typeof Button>
}

/**
 * Header with image to display at top of page
 * If no title or subtitle is given then no card will render
 */
const Header: React.FC<HeaderProps> = ({
  heading,
  src,
  title,
  subtitle,
  callToAction,
}) => (
  <header className="header">
    <div className="header__image soft-shadow">
      {src?.endsWith('.webm') ? (
        <video src={src} autoPlay loop muted controls={false}>
          <source src={src} type="video/webm" />
        </video>
      ) : (
        <img src={src} alt="" />
      )}
    </div>
    <h1 className="highlight highlight--grey-light">{heading}</h1>
    {title && (
      <Card className="soft-shadow h4">
        <h4>
          <strong>{title}</strong>
          <span className="fade fade--delayed">&nbsp;&mdash;&nbsp;</span>
          <span className="fade fade--delayed">
            {subtitle && (
              <span className="fade">{subtitle}</span>
            )}
          </span>
        </h4>
        {callToAction}
      </Card>
    )}
  </header>
)
export default Header
