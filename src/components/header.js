import React from 'react'
import PropTypes from 'prop-types'
import './header.css'

import Card from './card'

/**
 * Header with image to display at top of page
 * If no title or subtitle is given then no card will render
 * @param {*} props { `heading`, `src`, `title`, `subtitle` }
 */
export default function Header(props) {
  const {
    heading, src, title, subtitle,
  } = props

  return (
    <header id="header" key={0}>
      <h1 className="highlight-light-grey">{heading}</h1>
      <div className="img-container soft-shadow" style={{ backgroundImage: `url("${src}")` }} />
      {
        title && subtitle ? (
          <Card className="soft-shadow">
            <h4>
              <strong>{ title }</strong>
              &nbsp;&mdash;&nbsp;
              { subtitle }
              <br />
            </h4>
          </Card>
        ) : (
          null
        )
      }
    </header>
  )
}

Header.propTypes = {
  /**
   * Standout heading for top of header
   */
  heading: PropTypes.string,
  /**
   * Image to display within header
   */
  src: PropTypes.string,
  /**
   * Title to display within header card
   */
  title: PropTypes.string,
  /**
   * Subtitle to display within header card
   */
  subtitle: PropTypes.string,
}

Header.defaultProps = {
  heading: '',
  src: '',
  title: '',
  subtitle: '',
}
