import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

// Files
import './skeletons.scss'

// Pages
import Index from './pages/index'
import Projects from './pages/projects'
import ProjectPage from './pages/project-page'
import Error404 from './pages/404'
import Page from './components/page'
import Stores from './hooks/Stores'

const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/projects',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Projects />,
          },
          {
            path: '/projects/:href',
            element: <ProjectPage />,
          },
        ],
      },
    ],
  },
])

/**
 * Render an absolutely amazing website for an absolutely amazing human being
 */
const App: React.FC = () => (
  <React.StrictMode>
    <Stores>
      <RouterProvider router={mainRouter} />
    </Stores>
  </React.StrictMode>
)
export default App
