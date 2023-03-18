import React from 'react'
import { Link } from 'react-router-dom'

// Files
import './index.scss'

// Components
import Header from '../components/header'
import Footer from '../components/footer'
import Button from '../components/button'

// Page Specific Components
import Projects from './index/projects'
import Resume from './index/resume'
import useWithResumeData from '../hooks/useWithResumeData'

/**
 * Renders `/` page content
 * @example
 * <Index history={history} />
 */
const Index: React.FC = () => {
  const { resumeData } = useWithResumeData()
  const subtitle = resumeData === null || 'error' in resumeData
    ? undefined
    : resumeData.record.intro

  return (
    <>
      <Header
        src="/media/profile.jpg"
        heading="Noah Baldwin"
        title="Hello!"
        subtitle={subtitle}
        callToAction={(
          <Button
            as={Link}
            className="soft-shadow"
            to="/projects"
          >
            Show Me More!
          </Button>
        )}
      />
      <Projects />
      <Resume />
      <Footer />
    </>
  )
}
export default Index
