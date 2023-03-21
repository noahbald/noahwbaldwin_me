import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'

import FeatureList, { FeatureListItem } from '../components/feature-list'

import './projects.scss'

import useWithProjectData from '../hooks/useWithProjectData'
import IProjects from '../data/IProjects'
import Footer from '../components/footer'

export interface ProjectListProps {
  skeleton: boolean
  data: IProjects['record']
}

/**
 * Renders `FeatureList` for `Projects`
 */
export const ProjectList: React.FC<ProjectListProps> = ({
  skeleton,
  data,
}) => (
  <section className="project-list">
    <Helmet>
      <title>Noah Baldwin | Projects</title>
    </Helmet>
    <h1 className="highlight highlight--secondary">
      Projects
    </h1>
    <FeatureList
      skeleton={skeleton}
      skeletonChild={(
        <>
          <h4>
            <strong>&nbsp;</strong>
          </h4>
          <p className="project-list__subtitle">&nbsp;</p>
          <p className="project-list__type">&nbsp;</p>
          <span className="project-list__metadata">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </span>
        </>
      )}
    >
      {data.map((item) => (
        <FeatureListItem
          key={item.uid}
          src={item.src}
          to={item.href}
          toTitle={item.title}
        >
          <h4>
            <strong>{item.title}</strong>
          </h4>
          <p className="project-list__subtitle">{item.subtitle}</p>
          <p className="project-list__type">{item.type}</p>
          <span className="project-list__metadata">
            <p>{item.metadata.year}</p>
            <p>{item.metadata.topics.join(', ')}</p>
          </span>
        </FeatureListItem>
      ))}
    </FeatureList>
  </section>
)

export interface ProjectsProps {}

/**
 * Renders `/projects` page content
 * @example
 * <Projects />
 */
const Projects: React.FC<ProjectsProps> = () => {
  const projectData = useWithProjectData()
  const data: IProjects['record'] | null = useMemo(() => {
    if (projectData && 'error' in projectData) {
      return [{
        title: 'Failed to get projects',
        subtitle: 'Sorry, seems like something went wrong on our end',
        type: '',
        markdown: '',
        href: '',
        src: 'https://via.placeholder.com/560x256?text=N/A',
        uid: 'error',
        metadata: {
          year: 0,
          topics: [],
          client: '',
          featured: false,
        },
      }]
    }
    return projectData
  }, [projectData])

  return (
    <>
      <ProjectList
        skeleton={data === null || navigator.userAgent === 'ReactSnap'}
        data={data || []}
      />
      <Footer homeButton />
    </>
  )
}
export default Projects
