import React from 'react'
import PropTypes from 'prop-types'

// Files
import '../App.css'
import './index.css'
import profile from './index/profile.jpg'

// Components
import Header from '../components/header'
import Footer from '../components/footer'

// Page Specific Components
import Projects from './index/projects'
import Resume from './index/resume'

/**
 * Renders `/` page content
 * @param {*} props { history }
 * @example
 * <Index history={history} />
 */
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    document.title = 'Noah Baldwin | Student Software Engineer'
  }

  render() {
    const { history } = this.props
    return (
      <>
        <Header src={profile} heading="Noah Baldwin" title="Software Engineering Student" subtitle="Ask me about UI, UX, React, or Web Design" />
        <Projects galleryContents={this.galleryContents} history={history} />
        <Resume />
        <Footer />
      </>
    )
  }
}

Index.propTypes = {
  /**
   * `react-router-dom` history API
   */
  history: PropTypes.shape().isRequired,
}
