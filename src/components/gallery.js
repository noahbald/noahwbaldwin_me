import React from 'react'
import PropTypes from 'prop-types'

import negIndex from '../services/negIndex'
import Button from './button'
import Card from './card'

import isProtocol from '../services/isProtocol'

import './gallery.css'
import arrowLeft from './component-assets/arrow-left.svg'
import arrowRight from './component-assets/arrow-right.svg'

/**
 * A carousel which displays up to two items at a time
 * Each item of the `Gallery` is an image, title-subtitle pair
 * @param {*} props
 * @example
 * <Gallery
 *  contents={[
 *    {
 *      uid: '1234',
 *      title: 'Example',
 *      subtitle: 'This is an example Gallery',
 *      href: "/",
 *      src: galleryImage,
 *    }
 *  ]}
 * />
 */
class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0,
    }
  }

  /**
   * return four items from `this.props.content` based on `this.state.position`
   */
  getVisibleContent() {
    const { contents } = this.props
    const { position } = this.state
    const visibleContent = []
    for (let i = 0; i < 4; i += 1) {
      visibleContent.push(contents[negIndex(position + i - 1, contents.length)])
    }
    return visibleContent
  }

  /**
   * Changes `this.state.position` by the given `delta`
   * @param {number} delta The change in `this.state.position` to make
   */
  changePosition(delta) {
    const { position } = this.state
    const newPosition = position + delta
    this.setState({ position: newPosition })
  }

  /**
   * The `onClick` event to be given to gallery items based on the url of each `content` item
   * @param {string} url page location
   */
  changePage(url) {
    const { history } = this.props
    if (isProtocol(url)) {
      window.location = url
    } else {
      history.push(url)
    }
  }

  render() {
    const { contents, loading, prefix } = this.props
    const { position } = this.state
    const visibleContent = this.getVisibleContent()

    // If lazy loading is indicated render template
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
          // Get data ready to position each gallery item correctly
          const posOverflow = Math.floor((position + i) / contents.length)
          const iPos = i - 1
          const opacity = iPos < 0 || iPos > 1 ? 0 : 1
          const translateX = `translateX(calc(64px + (100% + 64px) * ${iPos}))`

          const href = `${isProtocol(x.href) ? '' : prefix}${x.href}`

          return (
            <div
              key={x.uid + posOverflow}
              className="gallery-content soft-shadow"
              style={{ transform: translateX, opacity }}
              onClick={() => {
                this.changePage(href)
              }}
              onKeyDown={(e) => {
                if ((e.keyCode || e.which) === 13 || (e.keyCode || e.which) === 18) {
                  this.changePage(href)
                }
                return false
              }}
              role="presentation"
              tabIndex={opacity - 1}
            >
              <div className="gallery-image" style={{ backgroundImage: `url(${x.src})` }} />
              <Card
                to={href}
                toTitle={x.title}
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
  /**
   * Given content of `Gallery`
   */
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      href: PropTypes.string,
      src: PropTypes.string,
    }),
  ),
  /**
   * Indicate whether lazy loading of gallery is in progress
   */
  loading: PropTypes.bool,
  /**
   * `react-router-dom` history API
   */
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  prefix: PropTypes.string,
}

Gallery.defaultProps = {
  contents: [{
    uid: '',
    title: 'Missing Title',
    subtitle: 'Missing Subtitle',
    href: '.',
    src: 'https://via.placeholder.com/480x480?text=N/A',
  }],
  loading: false,
  prefix: '',
}
export default Gallery
