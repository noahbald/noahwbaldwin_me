import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLocation } from 'react-router-dom'

import Header from '../components/header'
import Markdown from '../components/markdown'
import Footer from '../components/footer'
import Error404 from './404'
import Button from '../components/button'
import ExternalLinks, { ExternalLink } from '../components/external-links'

import './project-page.scss'
import { ReactComponent as GitHubIcon } from '../components/component-assets/footer/github.svg'
import { ReactComponent as FigmaIcon } from '../components/component-assets/external-links/figma.svg'
import { ReactComponent as ProjectIcon } from '../components/component-assets/external-links/open-in-new.svg'

import useWithProjectData from '../hooks/useWithProjectData'

const ExternalLinkIcon: React.FC<{ icon: string }> = ({ icon }) => {
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

const ProjectPage: React.FC = () => {
  const { pathname } = useLocation()

  const data = useWithProjectData(pathname || '')

  const header = useMemo(() => (
    data && !('error' in data) ? (
      <Header
        heading={data.type}
        title={data.title}
        subtitle={data.subtitle}
        src={data.src}
        callToAction={(
          <Button
            as={Link}
            to="/"
          >
            Return Home
          </Button>
        )}
      />
    ) : (
      <Header />
    )
  ), [data])

  const externalLinks = useMemo(() => (
    data && !('error' in data) && data.externalLinks && (
      <ExternalLinks>
        {Object.entries(data.externalLinks).map(([key, value]) => (
          <ExternalLink
            key={key}
            title={key}
            to={value}
          >
            <ExternalLinkIcon icon={key} />
          </ExternalLink>
        ))}
      </ExternalLinks>
    )
  ), [data])

  return (
    data && 'error' in data ? (
      <Error404 />
    ) : (
      <>
        {data && (
          <Helmet>
            <title>{data.title || ''}</title>
            <meta name="title" content={data.title || ''} />
            <meta name="displaydate" content={data.metadata && data.metadata.year ? String(data.metadata.year) : ''} />
            <meta content="noahwbaldwin.me" property="og:site_name" />
            <meta name="copyright" content={data.metadata && data.metadata.year ? String(data.metadata.year) : ''} />
          </Helmet>
        )}
        {header}
        <section className="project-page">
          {externalLinks}
          <div className="byline-name" style={{ display: 'none' }}>Noah Baldwin</div>
          <Markdown loading={data === null} markdown={data?.markdown} />
        </section>
        <Footer homeButton />
      </>
    )
  )
}
export default ProjectPage
