import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

// Files
import './App.css'
import './skeletons.css'

// Pages
import Index from './pages/index'
import Projects from './pages/projects'

/**
 * Render an absolutely amazing website for an absolutely amazing human being
 */
export default function App() {
  document.title = 'Noah Baldwin'
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={Index}
        />
        <Route
          exact
          path="/projects"
          component={Projects}
        />
        <Route path="*" status={404}>
          <p>404 Error</p>
        </Route>
      </Switch>
    </Router>
  )
}
