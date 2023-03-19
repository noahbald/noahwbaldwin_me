import React from 'react'
import { Link } from 'react-router-dom'

// Components
import FeatureBox from '../../components/feature-box'
import Button from '../../components/button'

import './resume.scss'
import useWithResumeData, { ResumeReducerState } from '../../hooks/useWithResumeData'
import IResume from '../../data/IResume'

const isLoading = (
  resumeData: ResumeReducerState,
): resumeData is Exclude<ResumeReducerState, IResume> => (
  resumeData === null
  || 'error' in resumeData
)

/**
 * Display professional information with a title and feature box
 * @example
 * <Resume />
 */
const Resume: React.FC = () => {
  const { resumeData } = useWithResumeData()

  const content = isLoading(resumeData)
    ? undefined
    : resumeData.record.items

  return (
    <section className="resume">
      <h2 className="highlight--tertiary h1">Résumé</h2>
      <Button
        as={Link}
        type="text"
        to="https://docs.google.com/document/d/15GdJKS1wCaYaHCohnCSZ1wRDol4p8ACvuRvPh2PIhho/export?format=pdf"
        rel="external"
      >
        Download Résumé
      </Button>
      <FeatureBox content={content} loading={isLoading(resumeData)} />
    </section>
  )
}
export default Resume
