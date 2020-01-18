import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

export default function Error404() {
  return (
    <>
      <Header
        heading="404 Error"
        title="Page Not Found"
        subtitle="Looks like you've entered or followed a URL that doesn't exist"
        src=""
      />
      <Footer homeButton />
    </>
  )
}
