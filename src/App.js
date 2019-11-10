import React from 'react'
import PropTypes from 'prop-types'

// Files
import './App.css'
import profile from './scenes/index/profile.jpg'

// Scripts
import uuid from './services/uid'
import Markdown from './components/markdown'
import Gallery from './components/gallery'


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
      <Header src={profile} heading="Noah Baldwin" title="Software Engineering Student" subtitle="Ask me about UI, UX, React, or Web Design" />,
      <section id="projects" key={1}>
        <h2 className="highlight-secondary">Projects</h2>
        <p><a href=".">View More</a></p>
        <Gallery contents={galleryContents} />
      </section>,
      <section id="resume" key={2}>
        <h2 className="highlight-tertiary">Resum‌&eacute;</h2>
        <p><a href="./scenes/index/Noah-Baldwin-Resume.pdf">PDF Version</a></p>
        <Markdown
          fetch={async () => {
            const resume = await import('./scenes/index/resume/resume.md')
            return fetch(resume.default)
          }}
          importSrc={async (src) => {return await import('./media/' + src)}} />
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
