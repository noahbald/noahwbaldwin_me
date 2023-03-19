import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'
import Button from '../components/button'

import image from './404.webm'

const Error404: React.FC = () => (
  <>
    <Helmet>
      <title>Noah Baldwin | 404 Page not found</title>
    </Helmet>
    <Header
      heading="404 Error"
      title="Page Not Found"
      subtitle="I don't trust like that."
      src={image}
      callToAction={(
        <Button
          as={Link}
          to="/"
        >
          Let me in!
        </Button>
      )}
    />
    <Footer homeButton />
  </>
)
export default Error404
