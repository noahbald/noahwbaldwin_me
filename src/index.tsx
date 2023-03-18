import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import 'modern-css-reset'
import 'typeface-lato'

import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.scss'

const rootNode = document.getElementById('root')
if (rootNode) {
  if (rootNode.hasChildNodes()) {
    hydrateRoot(rootNode, <App />)
  } else {
    const root = createRoot(rootNode)
    root.render(<App />)
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
