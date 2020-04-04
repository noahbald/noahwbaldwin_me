import React from 'react'

import Header from '../components/header'
import Markdown from '../components/markdown'
import Footer from '../components/footer'
import Error404 from './404'
import Page from '../components/page'
import Button from '../components/button'
import ExternalLinks, { ExternalLink } from '../components/external-links'

import isProtocol from '../services/isProtocol'
import isStatic from '../services/isStatic'

import './project-page.css'
import { ReactComponent as GitHubIcon } from '../components/component-assets/footer/github.svg'
import { ReactComponent as FigmaIcon } from '../components/component-assets/external-links/figma.svg'
import { ReactComponent as ProjectIcon } from '../components/component-assets/external-links/open-in-new.svg'


function ExternalLinkIcon(props) {
  const { icon } = props
  switch (icon) {
    case 'project':
      return <ProjectIcon />
    
    case 'github':
      return <GitHubIcon />
  
    case 'figma':
      return <FigmaIcon />
  
    default:
      return <ProjectIcon />
  }
}

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null,
      markdown: null,
      error404: false,
    }
    this.getDataFromMarkdown()
  }

  async getDataFromMarkdown() {
    const { match } = this.props
    const mdRegImage = /!\[.*?\]\(.*?[\s"]?\)/g
    // Import project data
    let dataImport
    try {
      dataImport = await import('../data/projects.json')
    } catch (error) {
      console.error('Failed to load projects')
      return this.setState({ error404: true })
    }
    const projects = dataImport.default
    const projectData = projects.find((elem) => elem.href === match.params.href)
    document.title = `Noah Baldwin | ${projectData.title}`
    let src
    try {
      src = isProtocol(projectData.src) || isStatic(projectData.src) ? projectData.src : await import(`./projects/feature-images/${projectData.src}`)
    } catch (error) {
      console.error('Failed to load header image')
      return this.setState({ error404: true })
    }
    projectData.src = typeof src === 'string' ? src : src.default
    this.setState({
      data: projectData
    })

    // Import markdown
    let mdImport, markdown
    try {
      mdImport = await import(`./projects/${projectData.markdown}`)
      markdown = await (await fetch(mdImport.default)).text()
    } catch (error) {
      console.error('Failed to load markdown')
      return this.setState({ error404: true })
    }

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
          imageFile = images[i].match(/\(.+?[\s")]/g)[0].slice(1, -1)
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
    try {
      newImages = await Promise.all(newImages)
    } catch (error) {
      console.error('Failed to load markdown images')
      this.setState({ error404: true })
    }
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
    const { loading, data, markdown, error404 } = this.state

    if (error404) {
      return (
        <Error404 />
      )
    }

    let header = data ? (
      <Header
        heading={data.type}
        title={data.title}
        subtitle={data.subtitle}
        src={data.src}
        callToAction={(
          <Button
            to="/"
          >
            Return Home
          </Button>
        )}
      />
    ) : (
      <Header />
    )
    const externalLinks = data && data.externalLinks ? (
      <ExternalLinks>
        {Object.keys(data.externalLinks).map((key, i) => {
          return (
            <ExternalLink
              key={i}
              title={key}
              href={data.externalLinks[key]}
            >
              <ExternalLinkIcon icon={key} />
            </ExternalLink>
          )
        })}
      </ExternalLinks>
    ) : null

    return (
      <Page>
        {header}
        <section id="project-page">
          {externalLinks}
          <Markdown loading={loading} markdown={markdown} />
        </section>
        <Footer homeButton />
      </Page>
    )
  }
}
