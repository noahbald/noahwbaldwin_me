import React from 'react'
import PropTypes from 'prop-types'

// Files
import '../App.css'
import './index.css'
import profile from './index/profile.jpg'

// Components
import Header from '../components/header'
import Footer from '../components/footer'
import Page from '../components/page'
import Button from '../components/button'

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
      <Page>
        <Header
          src={profile}
          heading="Noah Baldwin"
          title="Hello!"
          subtitle="I'm a Software Engineering student who loves creating things!"
          callToAction={(
            <Button
              className="soft-shadow"
              to="/projects"
            >
              Show Me More!
            </Button>
          )}
        />
        <Projects galleryContents={this.galleryContents} history={history} />
        <Resume />
        <Footer />
      </Page>
    )
  }
}

Index.propTypes = {
  /**
   * `react-router-dom` history API
   */
  history: PropTypes.shape().isRequired,
}
