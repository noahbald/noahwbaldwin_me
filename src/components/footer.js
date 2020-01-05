import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as GitHub } from './component-assets/footer/github.svg'
import { ReactComponent as LinkedIn } from './component-assets/footer/linkedin.svg'
import { ReactComponent as Instagram } from './component-assets/footer/instagram.svg'
import { ReactComponent as Spotify } from './component-assets/footer/spotify.svg'
import './footer.css'

export default function Footer() {
  return (
    <footer key={3}>
      <h2 className="highlight-primary">Say Hi,</h2>
      <h3 id="email"><a href="mailto:hi@noahwbaldwin.me">hi@noahwbaldwin.me</a></h3>
      <div className="footer-links">
        <Link
          to="https://github.com/noahbald"
          style={{ display: 'inline-flex' }}
          title="Github"
        >
          <GitHub />
        </Link>
        <Link
          to="https://www.linkedin.com/in/noahwbaldwin/"
          style={{ display: 'inline-flex' }}
          title="LinkedIn"
        >
          <LinkedIn />
        </Link>
        <Link
          to="https://www.instagram.com/noahbald/"
          style={{ display: 'inline-flex' }}
          title="Instagram"
        >
          <Instagram />
        </Link>
        <Link
          to="https://www.instagram.com/noahbald/"
          style={{ display: 'inline-flex' }}
          title="Instagram"
        >
          <Spotify />
        </Link>
      </div>
    </footer>
  )
}
