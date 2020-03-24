import React from 'react'
import PropTypes from 'prop-types'

import Button from './button'
import Link from './link'
import ExternalLinks, { ExternalLink } from './external-links'

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
      <ExternalLinks>
        <ExternalLink
          href="https://github.com/noahbald"
          title="Github"
        >
          <GitHub />
        </ExternalLink>
        <ExternalLink
          href="https://www.linkedin.com/in/noahwbaldwin/"
          title="LinkedIn"
        >
          <LinkedIn />
        </ExternalLink>
        <ExternalLink
          href="https://www.instagram.com/noahbald/"
          title="Instagram"
        >
          <Instagram />
        </ExternalLink>
        <ExternalLink
          href="spotify:user:12101435749"
          title="Spotify"
        >
          <Spotify />
        </ExternalLink>
      </ExternalLinks>
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
