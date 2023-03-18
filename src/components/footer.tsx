import React from 'react'
import { Link } from 'react-router-dom'

import Button from './button'
import ExternalLinks, { ExternalLink } from './external-links'

import { ReactComponent as GitHub } from './component-assets/footer/github.svg'
import { ReactComponent as LinkedIn } from './component-assets/footer/linkedin.svg'
import { ReactComponent as Instagram } from './component-assets/footer/instagram.svg'
import { ReactComponent as Spotify } from './component-assets/footer/spotify.svg'

import './footer.scss'

export interface FooterProps {
  homeButton?: boolean
}

/**
 * Footer to display at the bottom of every page
 */
const Footer: React.FC<FooterProps> = ({ homeButton }) => (
  <footer key={3}>
    {homeButton && (
      <Button as={Link} type="text" to="/">Return Home</Button>
    )}
    <h2 className="highlight--primary h1">Say Hi,</h2>
    <h3 id="email"><a href="mailto:hi@noahwbaldwin.me">hi@noahwbaldwin.me</a></h3>
    <ExternalLinks>
      <ExternalLink
        to="https://github.com/noahbald"
        title="Github"
      >
        <GitHub />
      </ExternalLink>
      <ExternalLink
        to="https://www.linkedin.com/in/noahwbaldwin/"
        title="LinkedIn"
      >
        <LinkedIn />
      </ExternalLink>
      <ExternalLink
        to="https://www.instagram.com/noahbald/"
        title="Instagram"
      >
        <Instagram />
      </ExternalLink>
      <ExternalLink
        to="spotify:user:12101435749"
        title="Spotify"
      >
        <Spotify />
      </ExternalLink>
    </ExternalLinks>
  </footer>
)
export default Footer
