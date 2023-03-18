import React from 'react'
import { ProjectStore } from './useWithProjectData'
import { ResumeStore } from './useWithResumeData'

const Stores: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ProjectStore>
    <ResumeStore>
      {children}
    </ResumeStore>
  </ProjectStore>
)
export default Stores
