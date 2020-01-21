import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

import image from './404.gif'

export default function Error404() {
  return (
    <>
      <Header
        heading="404 Error"
        title="Page Not Found"
        subtitle="When you try so hard but you don't succeed 😢"
        src={image}
      />
      <Footer homeButton />
    </>
  )
}
