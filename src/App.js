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

export default function App() {
  document.title = 'Noah Baldwin'
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="*" status={404}>
          <p>404 Error</p>
        </Route>
      </Switch>
    </Router>
  )
}
