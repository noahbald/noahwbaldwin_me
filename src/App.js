import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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

function MainRouter(props) {
  const { location } = props

  return (
    <Route
      location={location}
      render={() => (
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/:href" component={ProjectPage} />
          <Route path="/index*">
            <Redirect to="/" />
          </Route>
          <Route component={Error404} status={404} />
        </Switch>
      )}
    />
  )
}

/**
 * Render an absolutely amazing website for an absolutely amazing human being
 */
export default function App() {
  const originalHost = /^http\w:\/\/w{3}?\.noahwbaldwin\.me/

  // Return transitioning router if hosted as intended
  if (window.location.href.match(originalHost)) {
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
                    exit: 1000,
                  }}
                >
                  <MainRouter location={location} />
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </Router>
    )
  }

  // Return normal router
  return (
    <Router>
      <MainRouter />
    </Router>
  )
}
