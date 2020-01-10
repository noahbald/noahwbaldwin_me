import React from 'react'

// Components
import FeatureBox from '../../components/feature-box'
import Button from '../../components/button'

import './resume.css'

/**
 * Display professional information with a title and feature box
 * @param {*} props {}
 * @example
 * <Resume />
 */
class Resume extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingResumeContent: true,
      resumeContent: null,
    }
    this.loadFeatureBoxContents()
  }

  /**
   * Lazily load resume data
   * TODO: convert './resumeFeatureBox' to JSON
   */
  async loadFeatureBoxContents() {
    const resumeContent = await import('./resumeFeatureBox')
    this.setState({
      loadingResumeContent: false,
      resumeContent: resumeContent.default
    })
  }

  render() {
    const { loadingResumeContent, resumeContent } = this.state

    return (
      <section id="resume">
        <h2 className="highlight-tertiary">Résumé</h2>
        <Button type="text" to="https://docs.google.com/document/d/15GdJKS1wCaYaHCohnCSZ1wRDol4p8ACvuRvPh2PIhho/edit?usp=sharing">
          Download Résumé
        </Button>
        <FeatureBox content={resumeContent} loading={loadingResumeContent} />
      </section>
    )
  }
}

export default Resume
