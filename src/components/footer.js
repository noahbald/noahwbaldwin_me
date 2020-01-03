import React from 'react'
import { Link } from 'react-router-dom'

import Button from './button'

import gitHub from './component-assets/footer/github.svg'
import linkedIn from './component-assets/footer/linkedin.svg'
import instagram from './component-assets/footer/instagram.svg'
import spotify from './component-assets/footer/spotify.svg'
import './footer.css'

export default function Footer() {
  return (
    <footer key={3}>
      <h2 className="highlight-primary">Say Hi,</h2>
      <h3 id="email"><a href="mailto:hi@noahwbaldwin.me">hi@noahwbaldwin.me</a></h3>
      <div className="footer-links">
        <Link to="https://github.com/noahbald" className="button-link">
          <Button icon={gitHub} />
        </Link>
        <Link to="https://www.linkedin.com/in/noahwbaldwin/" className="button-link">
          <Button icon={linkedIn} />
        </Link>
        <Link to="https://www.instagram.com/noahbald/" className="button-link">
          <Button icon={instagram} />
        </Link>
        <Link to="https://www.instagram.com/noahbald/" className="button-link">
          <Button icon={spotify} />
        </Link>
      </div>
    </footer>
  )
}
