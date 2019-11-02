import React from 'react'
import PropTypes from 'prop-types'

// Files
import './App.css'
import profile from './scenes/index/profile.jpg'
import resume from './scenes/index/Noah-Baldwin-Resume.pdf'

// Scripts
import uuid from './services/uid'
import Gallery from './components/gallery/gallery'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const galleryContents = [
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=one',
      },
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=two',
      },
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=three',
      },
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=four',
      },
    ]

    return [
      <Header src={profile} heading="Noah Baldwin" title="Lorem Ipsum Dolor" subtitle="Lorem Ipsum Dolor Lorem Ipsum Dolor" />,
      <section id="projects" key={1}>
        <h2 className="highlight-secondary">Projects</h2>
        <p><a href=".">View More</a></p>
        <Gallery contents={galleryContents} />
      </section>,
      <section id="resume" key={2}>
        <h2 className="highlight-tertiary">Resum‌&eacute;</h2>
        <p><a href="./scenes/index/Noah-Baldwin-Resume.pdf">PDF Version</a></p>
        <embed src={`${resume}#view=fitH`} type="application/pdf" width="100%" height="100%" />
      </section>,
      <Footer />,
    ]
  }
}

function Header(props) {
  const {
    heading, src, title, subtitle,
  } = props
  return (
    <section id="header" key={0}>
      <h1 className="highlight-light-grey">{heading}</h1>
      <div className="img-container soft-shadow" style={{ backgroundImage: `url("${src}")` }} />
      <div className="card soft-shadow">
        <h4>
          <strong>{ title }</strong>
          { subtitle }
        </h4>
      </div>
    </section>
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

function Footer() {
  return (
    <footer key={3}>
      <h2 className="highlight-primary">Say Hi,</h2>
      <h3 id="email"><a href="mailto:noahwbaldwin@protonmail.com">noahwbaldwin@protonmail.com</a></h3>
    </footer>
  )
}

export default App
