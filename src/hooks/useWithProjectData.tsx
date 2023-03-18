import React, { useEffect, useMemo, useReducer } from 'react'
import IProjects from '../data/IProjects'

type ProjectReducerState = IProjects['record'] | { error: any } | null

export const initialReducerState = null

interface ProjectReducerActionSet {
  type: 'set',
  data: IProjects['record']
}

interface ProjectReducerActionsError {
  type: 'error'
  data: any
}

type ProjectReducerActions = ProjectReducerActionSet | ProjectReducerActionsError

export const projectReducer: React.Reducer<ProjectReducerState, ProjectReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'set':
      return action.data
    case 'error':
      return { error: action.data }
    default:
      return state
  }
}

export const ProjectContext = React.createContext<[
  ProjectReducerState,
  React.Dispatch<ProjectReducerActions>,
]>(
  // eslint-disable-next-line no-console
  [null, () => console.error('ProjectContext not ready')],
)

export const ProjectStore: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value = useReducer(projectReducer, initialReducerState)
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

export interface FUseWithProjectData {
  (projectID: string): IProjects['record'][number] | Exclude<ProjectReducerState, IProjects['record']>;
  (projectID?: undefined): ProjectReducerState
}
// @ts-ignore
const useWithProjectData: FUseWithProjectData = (projectID) => {
  const [projectState, projectDispatch] = useReducer(projectReducer, initialReducerState)

  useEffect(() => {
    if (!projectState) {
      fetch('/api/projects').then(async (response) => {
        const projects = await response.json() as IProjects
        const projectData = projects.record
        projectDispatch({ type: 'set', data: projectData })
      }).catch((e) => {
        projectDispatch({ type: 'error', data: e })
      })
    }
  }, [])

  const matchedProjectState = useMemo(() => {
    if (typeof projectID === 'string') {
      if (Array.isArray(projectState)) {
        const matchedProject = projectState.find((item) => projectID.startsWith(item.href)) || { error: 'Project not found' }
        return matchedProject
      }
      return null
    }
    return projectState
  }, [projectState])

  return matchedProjectState
}
export default useWithProjectData
