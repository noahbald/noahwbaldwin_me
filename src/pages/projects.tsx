import React, { useMemo } from 'react'

import FeatureList, { FeatureListItem } from '../components/feature-list'

import './projects.scss'

import useWithProjectData from '../hooks/useWithProjectData'
import IProjects from '../data/IProjects'

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
}) => {
  if (skeleton) {
    return (
      <section className="project-list">
        <h1 className="highlight--secondary">
          Projects
        </h1>
        <FeatureList skeleton />
      </section>
    )
  }

  return (
    <section className="project-list">
      <h1 className="highlight--secondary">
        Projects
      </h1>
      <FeatureList>
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
            <p>{item.subtitle}</p>
            <p
              style={{
                color: '#858898',
              }}
            >
              {item.type}
            </p>
            <p
              style={{
                position: 'absolute',
                bottom: 32,
                left: 32,
              }}
            >
              {item.metadata.year}
            </p>
            <p
              style={{
                position: 'absolute',
                bottom: 32,
                right: 32,
              }}
            >
              {item.metadata.topics.join(', ')}
            </p>
          </FeatureListItem>
        ))}
      </FeatureList>
    </section>
  )
}

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
    <ProjectList
      skeleton={data === null}
      data={data || []}
    />
  )
}
export default Projects
