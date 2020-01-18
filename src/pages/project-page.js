import React from 'react'

import Header from '../components/header'
import Markdown from '../components/markdown'
import Footer from '../components/footer'

import isProtocol from '../services/isProtocol'
import isStatic from '../services/isStatic'
import { PropTypes } from 'prop-types'

import './project-page.css'

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      markdown: null,
    }
    this.getDataFromMarkdown()
  }

  async getDataFromMarkdown() {
    const { match } = this.props
    const mdRegImage = /!\[.*?\]\(.*?[\s"]?\)/g
    // Import project data
    const dataImport = await import('../data/projects.json')
    const projects = dataImport.default
    const projectData = projects.find((elem) => elem.href === match.params.href)
    const src = isProtocol(projectData.src) || isStatic(projectData.src) ? projectData.src : await import(`./projects/feature-images/${projectData.src}`)
    projectData.src = typeof src === 'string' ? src : src.default
    this.setState({
      data: projectData
    })

    // Import markdown
    const mdImport = await import(`./projects/${projectData.markdown}`)
    let markdown = await (await fetch(mdImport.default)).text()

    // Import Images
    let images = markdown.match(mdRegImage)
    if (!images) {
      // If there's no images, don't bother importing anything
      this.setState({
        loading: false,
        markdown: markdown,
      })
      return
    }
    // Convert given image addresses to static imports
    let newImages = []
    for (let i = 0; i < images.length; i++) {
      // if not external resource, import image
      if (images[i]) {
        let imageFile
        // Try slicing image
        try {
          imageFile = images[i].match(/\(.+?[\s"\)]/g)[0].slice(1, -1)
        } catch (error) {
          newImages.push("")
          continue
        }
        // Try importing image
        if (isProtocol(imageFile)) {
          newImages.push(imageFile)
          continue
        }
        try {
          newImages.push(import(`./projects/images/${imageFile}`))
        } catch (error) {
          newImages.push(imageFile)
          continue
        }
      } else {
        newImages.push(images[i])
      }
    }
    newImages = await Promise.all(newImages)
    // Get static address for images
    newImages = newImages.map((module) => {
      if (typeof module === 'string') {
        return module
      }
      return module.default
    })
    // Replace old image sources with new image sources
    images = images.map((image, i) => {
      return image.replace(/(!\[.*?\]\().*[^\s"]((?:\s".*")?\))/, `$1${newImages[i]}$2`)
    })
    // Replace imported image sources with markdown
    let matchCount = 0
    markdown = markdown.replace(mdRegImage, (match) => {
      const i = matchCount
      matchCount++
      return images[i]
    })

    this.setState({
      loading: false,
      markdown: markdown,
    })
  }

  render() {
    const { loading, data, markdown } = this.state
    let header = data ? (
      <Header heading={data.type} title={data.title} subtitle={data.subtitle} src={data.src} />
    ) : (
      <Header />
    )

    return (
      <>
        {header}
        <section id="project-page">
          <Markdown loading={loading} markdown={markdown} />
        </section>
        <Footer homeButton />
      </>
    )
  }
}
