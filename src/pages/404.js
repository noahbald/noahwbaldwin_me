import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'
import Page from '../components/page'
import Button from '../components/button'

import image from './404.gif'

export default function Error404() {
  return (
    <Page>
      <Header
        heading="404 Error"
        title="Page Not Found"
        subtitle="I don't trust like that."
        src={image}
        callToAction={(
          <Button
            to="/"
          >
            Let me in!
          </Button>
        )}
      />
      <Footer homeButton />
    </Page>
  )
}
