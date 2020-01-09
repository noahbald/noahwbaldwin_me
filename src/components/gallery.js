import React from 'react'
import PropTypes from 'prop-types'

import negIndex from '../services/negIndex'
import Button from './button'
import Card from './card'

import isProtocol from '../services/isProtocol'

import './gallery.css'
import arrowLeft from './component-assets/arrow-left.svg'
import arrowRight from './component-assets/arrow-right.svg'

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

  changePage(url) {
    const { history } = this.props
    if (isProtocol(url)) {
      window.location = url
    } else {
      history.push(url)
    }
  }

  render() {
    const { contents, loading } = this.props
    const { position } = this.state
    const visibleContent = this.getVisibleContent()

    if (loading) {
      return (
        <div className="gallery skeleton">
          <Button
            type="text"
            aria-label="Previous item in gallery"
          />
          <div className="gallery-content soft-shadow" style={{ transform: 'translateX(calc(64px + (100% + 64px) * 0))' }}>
            <div className="gallery-image" />
            <Card>
              <h4>
                &nbsp;
              </h4>
            </Card>
          </div>
          <div className="gallery-content soft-shadow" style={{ transform: 'translateX(calc(64px + (100% + 64px) * 1))' }}>
            <div className="gallery-image" />
            <Card>
              <h4>
                &nbsp;
              </h4>
            </Card>
          </div>
          <Button
            type="text"
            aria-label="Next item in gallery"
          />
        </div>
      )
    }

    return (
      <div className="gallery">
        <Button
          type="text"
          icon={arrowLeft}
          onClick={() => this.changePosition(-1)}
          aria-label="Previous item in gallery"
        />
        {visibleContent.map((x, i) => {
          const posOverflow = Math.floor((position + i) / contents.length)
          const iPos = i - 1
          const opacity = iPos < 0 || iPos > 1 ? 0 : 1
          const translateX = `translateX(calc(64px + (100% + 64px) * ${iPos}))`

          return (
            <div
              key={x.uid + posOverflow}
              className="gallery-content soft-shadow"
              style={{ transform: translateX, opacity }}
              onClick={() => {
                this.changePage(x.href)
              }}
              onKeyDown={(e) => {
                if ((e.keyCode || e.which) === 13 || (e.keyCode || e.which) === 18) {
                  this.changePage(x.href)
                }
                return false
              }}
              role="presentation"
              tabIndex={opacity - 1}
            >
              <div className="gallery-image" style={{ backgroundImage: `url(${x.src})` }} />
              <Card
                to={x.href}
                className="test"
              >
                <h4>
                  <strong>{x.title}</strong>
                  &nbsp;&mdash;&nbsp;
                  {x.subtitle}
                </h4>
              </Card>
            </div>
          )
        })}
        <Button
          type="text"
          icon={arrowRight}
          onClick={() => this.changePosition(1)}
          aria-label="Next item in gallery"
        />
      </div>
    )
  }
}

Gallery.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      subtitle: PropTypes.string,
      href: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

Gallery.defaultProps = {
  contents: {
    uid: '',
    subtitle: 'Gallery is Missing Props',
    href: '#',
    src: 'https://via.placeholder.com/480x480?text=N/A',
  },
  loading: false,
}
export default Gallery
