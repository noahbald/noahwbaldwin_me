import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

// Files
import './App.css'
import './skeletons.css'

// Pages
import Index from './pages/index'
import Projects from './pages/projects'
import ProjectPage from './pages/project-page'
import Error404 from './pages/404'

/**
 * Render an absolutely amazing website for an absolutely amazing human being
 */
export default function App() {
  return (
    <Router forceRefresh={!('pushState' in window.history)}>
      <Route
        render={({ location }) => {
          const { pathname } = location;
          return (
            <TransitionGroup>
              <CSSTransition
                key={pathname}
                classNames="page"
                timeout={{
                  enter: 1000,
                  exit: 1000
                }}
              >
                <Route
                  location={location}
                  render={() => (
                    <Switch>
                      <Route exact path="/" component={Index} />
                      <Route exact path="/projects" component={Projects} />
                      <Route path="/projects/:href" component={ProjectPage} />
                      <Route component={Error404} />
                    </Switch>
                  )}
                />
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </Router>
  )
}
