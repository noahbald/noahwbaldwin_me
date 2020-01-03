import React from 'react'
import { Link } from 'react-router-dom'

// Scripts
import uuid from '../../services/uid'

// Components
import Gallery from '../../components/gallery'
import Button from '../../components/button'

import './projects.css'

export default class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.galleryContents = [
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=one',
      },
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=two',
      },
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=three',
      },
      {
        uid: uuid(),
        title: 'Lorem Ipsum Dolor',
        subtitle: 'Lorem Ipsum Dolor Lorem Ipsum Dolor',
        href: '#',
        src: 'https://via.placeholder.com/480x480?text=four',
      },
    ]
  }

  render() {
    return (
      <section id="projects">
        <h2 className="highlight-secondary">Projects</h2>
        <Button type="text">
          <Link to=".">View More</Link>
        </Button>
        <Gallery contents={this.galleryContents} />
      </section>
    )
  }
}
