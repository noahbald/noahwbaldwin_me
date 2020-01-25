import React from 'react'
import { withRouter } from 'react-router-dom'

import './page.css'

function Page(props) {
  const { children } = props
  return (
    <main className="page">
      <div className="page-inner">
        {children}
      </div>
    </main>
  )
}

export default withRouter(Page)
