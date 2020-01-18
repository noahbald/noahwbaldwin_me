import React from 'react'

// Components
import FeatureBox from '../../components/feature-box'
import Button from '../../components/button'

import isProtocol from '../../services/isProtocol'
import isStatic from '../../services/isStatic'

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
    const resumeContent = [...(await import('./resumeFeatureBox.json')).default]
    
    // Map images in JSON to object of imported images
    for (let i = 0; i < resumeContent.length; i++) {
      for (let j = 0; j < resumeContent[i].contents.length; j++) {
        const icon = resumeContent[i].contents[j].icon
        resumeContent[i].contents[j].icon = isProtocol(icon) || isStatic(icon) ? icon : import(`./resumeMedia/${icon}`)
      }
    }
    for (let i = 0; i < resumeContent.length; i++) {
      for (let j = 0; j < resumeContent[i].contents.length; j++) {
        const iconModule = resumeContent[i].contents[j].icon
        resumeContent[i].contents[j].icon = typeof iconModule === 'string' ? iconModule : (await iconModule).default
      }
    }

    this.setState({
      loadingResumeContent: false,
      resumeContent,
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
