import React from 'react'
import { Link } from 'react-router-dom'

// Scripts
import uuid from '../../services/uid'

// Components
import Gallery from '../../components/gallery'
import Button from '../../components/button'

import './projects.css'

export default class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      galleryContent: undefined,
    }
    this.loadContents()
  }

  async loadContents() {
    try {
      const galleryImport = await import('../../data/projects.json')
      let galleryContent = galleryImport.default
      galleryContent = galleryContent.filter(item => item.metadata.featured)
      this.setState({
        loading: false,
        galleryContent
      })
    } catch (error) {
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
        <Gallery contents={galleryContent} loading={loading} history={history} />
      </section>
    )
  }
}
