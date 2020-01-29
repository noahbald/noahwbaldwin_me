import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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

Page.propTypes = {
  children: PropTypes.node,
}

Page.defaultProps = {
  children: null,
}

export default withRouter(Page)
