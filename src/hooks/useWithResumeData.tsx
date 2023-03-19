import React, { createContext, useEffect, useReducer } from 'react'
import IResume from '../data/IResume'

export type ResumeReducerState = IResume | { error: any } | null

const initialResumeState = null

interface ResumeReducerSet {
  type: 'set'
  data: IResume
}

interface ResumeReducerError {
  type: 'error'
  data: { error: any }
}

type ResumeReducerActions = ResumeReducerSet | ResumeReducerError

export const resumeReducer: React.Reducer<ResumeReducerState, ResumeReducerActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'set':
      return action.data
    case 'error':
      return action.data
    default:
      return state
  }
}

const ResumeContext = createContext<[
  ResumeReducerState,
  React.Dispatch<ResumeReducerActions>,
]>(
  // eslint-disable-next-line no-console
  [initialResumeState, () => console.log('ResumeContext is not ready')],
)

export const ResumeStore: React.FC<React.PropsWithChildren> = ({ children }) => {
  const value = useReducer(resumeReducer, initialResumeState)
  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

const useWithResumeData = () => {
  const [resumeData, dispatchResumeData] = useReducer(resumeReducer, initialResumeState)

  useEffect(() => {
    if (!resumeData) {
      fetch('/api/resume').then(async (response) => {
        dispatchResumeData({ type: 'set', data: await response.json() })
      }).catch((error) => {
        dispatchResumeData({ type: 'error', data: { error } })
      })
    }
  }, [])

  return { resumeData }
}
export default useWithResumeData
