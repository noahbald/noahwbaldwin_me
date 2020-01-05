import React from 'react'
import PropTypes from 'prop-types'
import './header.css'

import Card from './card'

export default function Header(props) {
  const {
    heading, src, title, subtitle,
  } = props
  return (
    <header id="header" key={0}>
      <h1 className="highlight-light-grey">{heading}</h1>
      <div className="img-container soft-shadow" style={{ backgroundImage: `url("${src}")` }} />
      <Card className="soft-shadow">
        <h4>
          <strong>{ title }</strong>
          &nbsp;&mdash;&nbsp;
          { subtitle }
          <br />
        </h4>
      </Card>
    </header>
  )
}

Header.propTypes = {
  heading: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

Header.defaultProps = {
  heading: '',
  src: 'https://via.placeholder.com/480x480?text=N/A',
  title: '',
  subtitle: '',
}
