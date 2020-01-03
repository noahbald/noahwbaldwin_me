import React from 'react'

// Files
import '../App.css'
import './index.css'
import profile from '../scenes/index/profile.jpg'

// Components
import Header from '../components/header'
import Footer from '../components/footer'

// Page Specific Components
import Projects from './index/projects'
import Resume from './index/resume'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Header src={profile} heading="Noah Baldwin" title="Software Engineering Student" subtitle="Ask me about UI, UX, React, or Web Design" />
        <Projects galleryContents={this.galleryContents} />
        <Resume />
        <Footer />
      </>
    )
  }
}
