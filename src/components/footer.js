import React from 'react'
import PropTypes from 'prop-types'

import Button from './button'
import Link from './link'

import { ReactComponent as GitHub } from './component-assets/footer/github.svg'
import { ReactComponent as LinkedIn } from './component-assets/footer/linkedin.svg'
import { ReactComponent as Instagram } from './component-assets/footer/instagram.svg'
import { ReactComponent as Spotify } from './component-assets/footer/spotify.svg'
import './footer.css'

/**
 * Footer to display at the bottom of every page
 * @param {*} props { homeButton }
 */
export default function Footer(props) {
  const { homeButton } = props
  return (
    <footer key={3}>
      {
        // If homeButton is given, render a button in footer to return user to index
        homeButton ? (
          <Button type="text" to="/">Return Home</Button>
        ) : (
          null
        )
      }
      <h2 className="highlight-primary">Say Hi,</h2>
      <h3 id="email"><a href="mailto:hi@noahwbaldwin.me">hi@noahwbaldwin.me</a></h3>
      <div className="footer-links">
        <Link
          href="https://github.com/noahbald"
          style={{ display: 'inline-flex' }}
          title="Github"
          rel="external nofollow"
        >
          <GitHub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/noahwbaldwin/"
          style={{ display: 'inline-flex' }}
          title="LinkedIn"
          rel="external nofollow"
        >
          <LinkedIn />
        </Link>
        <Link
          href="https://www.instagram.com/noahbald/"
          style={{ display: 'inline-flex' }}
          title="Instagram"
          rel="external nofollow"
        >
          <Instagram />
        </Link>
        <Link
          href="https://www.instagram.com/noahbald/"
          style={{ display: 'inline-flex' }}
          title="Instagram"
          rel="external nofollow"
        >
          <Spotify />
        </Link>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  /**
   * Option to render button that returns user to index
   */
  homeButton: PropTypes.bool,
}

Footer.defaultProps = {
  homeButton: false,
}
