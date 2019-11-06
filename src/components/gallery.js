import React from 'react'
import PropTypes from 'prop-types'
import negIndex from '../services/negIndex'
import Button from './button'

import './gallery.css'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0,
    }
  }

  getVisibleContent() {
    const { contents } = this.props
    const { position } = this.state
    const visibleContent = []
    for (let i = 0; i < 4; i += 1) {
      visibleContent.push(contents[negIndex(position + i - 1, contents.length)])
    }
    return visibleContent
  }

  changePosition(delta) {
    const { position } = this.state
    const newPosition = position + delta
    this.setState({ position: newPosition })
  }

  render() {
    const { contents } = this.props
    const { position } = this.state
    const visibleContent = this.getVisibleContent()
    return (
      <div className="gallery">
        <Button text onClick={() => this.changePosition(-1)}>{'<'}</Button>
        {visibleContent.map((x, i) => {
          const posOverflow = Math.floor((position + i) / contents.length)
          const iPos = i - 1
          let opacity = 1
          const translateX = `translateX(calc(64px + (100% + 64px) * ${iPos}))`
          if (iPos < 0 || iPos > 1) {
            opacity = 0
          }
          return (
            <div key={x.uid + posOverflow} className="gallery-content" style={{ transform: translateX, opacity }}>
              <img className="gallery-image" style={{ backgroundImage: `url(${x.src})` }} alt="" />
              <div className="card">
                <h4>
                  <strong>{x.title}</strong>
                  {' '}
                  {x.subtitle}
                </h4>
              </div>
            </div>
          )
        })}
        <Button text onClick={() => this.changePosition(1)}>{'>'}</Button>
      </div>
    )
  }
}

Gallery.propTypes = {
  contents: PropTypes.exact({
    uid: PropTypes.string,
    subtitle: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.string,
  }),
}

Gallery.defaultProps = {
  contents: {
    uid: '',
    subtitle: 'Gallery is Missing Props',
    href: '#',
    src: 'https://via.placeholder.com/480x480?text=N/A',
  },
}
export default Gallery
