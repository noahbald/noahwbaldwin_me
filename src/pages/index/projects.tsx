import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

// Components
import Gallery from '../../components/gallery'
import Button from '../../components/button'

import './projects.scss'
import useWithProjectData from '../../hooks/useWithProjectData'

export interface ProjectsProps {}

/**
 * Displays projects data with title and `Gallery`
 * @example
 * <Projects history={history} />
 */
const Projects: React.FC<ProjectsProps> = () => {
  const projectData = useWithProjectData()
  const galleryContents = useMemo(
    () => (projectData === null || 'error' in projectData
      ? undefined
      : projectData),
    [projectData],
  )

  return (
    <section className="index__section projects">
      <h2 className="highlight highlight--secondary h1">Projects</h2>
      <Button
        as={Link}
        type="text"
        to="/projects"
      >
        View more
      </Button>
      <Gallery
        contents={galleryContents || []}
        loading={projectData === null}
      />
    </section>
  )
}
export default Projects
