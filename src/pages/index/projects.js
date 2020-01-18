import React from 'react'

// Components
import Gallery from '../../components/gallery'
import Button from '../../components/button'

import './projects.css'
import isProtocol from '../../services/isProtocol'
import isStatic from '../../services/isStatic'

/**
 * Displays projects data with title and `Gallery`
 * @param {*} props { `history` }
 * @example
 * <Projects history={history} />
 */
export default class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      galleryContent: undefined,
    }
    this.loadContents()
  }

  /**
   * Lazily load projects data when initialised
   */
  async loadContents() {
    try {
      const galleryImport = await import('../../data/projects.json')
      let galleryContent = galleryImport.default
      // Get only featured items from data
      galleryContent = galleryContent.filter(item => item.metadata.featured)
      let sources = []
      for (let i = 0; i < galleryContent.length; i++) {
        let source = galleryContent[i].src
        console.log(isProtocol(source) || isStatic(source))
        source = isProtocol(source) || isStatic(source) ? source : import(`../projects/feature-images/${source}`)
        sources.push(source)
      }
      sources = await Promise.all(sources)
      for (let i = 0; i < galleryContent.length; i++) {
        galleryContent[i].src = typeof sources[i] === 'string' ? sources[i] : sources[i].default
      }
      this.setState({
        loading: false,
        galleryContent
      })
    } catch (error) {
      console.error('Failed to load project gallery')
      this.setState({
        loading: true,
      })
    }
  }

  render() {
    const { loading, galleryContent } = this.state
    const { history } = this.props

    return (
      <section id="projects">
        <h2 className="highlight-secondary">Projects</h2>
        <Button type="text" to="/projects">
          View More
        </Button>
        <Gallery prefix={'projects/'} contents={galleryContent} loading={loading} history={history} />
      </section>
    )
  }
}
