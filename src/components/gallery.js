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
      dragging: false,
      dragInitialX: 0,
      dragDeltaX: 0,
    }

    this.intervalId = null
  }

  componentDidMount() {
    const INTERVAL_TIMEOUT = 3000
    this.intervalId = window.setInterval(() => this.changePosition(1), INTERVAL_TIMEOUT)
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

  startDrag(e) {
    const { dragging } = this.state
    const {
      pageX,
      touches,
      button,
      stopPropagation,
      preventDefault,
    } = e
    // Only left mouse button
    if (!dragging && (button === 0 || touches)) {
      // Remove autoscroll
      window.clearInterval(this.intervalId)

      // Mark beginning of dragging
      this.setState({
        dragging: true,
        dragInitialX: pageX || touches[0].pageX,
        dragDeltaX: pageX || touches[0].pageX,
      })

      stopPropagation()
      preventDefault()
    }
  }

  updateDrag(e) {
    const { dragging } = this.state
    const {
      pageX,
      touches,
      preventDefault,
      stopPropagation,
    } = e

    if (dragging) {
      this.setState({
        dragDeltaX: pageX || touches[0].pageX,
      })

      preventDefault()
      stopPropagation()
    }
  }

  cancelDrag() {
    this.setState({
      dragging: false,
    })
  }

  stopDrag(e, href) {
    const { dragInitialX, dragDeltaX } = this.state
    const { pageX, stopPropagation, preventDefault } = e
    const finalDragDeltaX = dragInitialX - (pageX || dragDeltaX)
    this.setState({
      dragging: false,
    })

    if (finalDragDeltaX > 128 || finalDragDeltaX < -128) {
      this.changePosition(Math.sign(finalDragDeltaX))
      stopPropagation()
      preventDefault()
    } else if (finalDragDeltaX > 64 || finalDragDeltaX < -64 || finalDragDeltaX === 0) {
      this.changePage(href)
    }
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
      <div
        className="gallery"
      >
        <Button
          type="text"
          icon={arrowLeft}
          onClick={() => {
            this.changePosition(-1)
            window.clearInterval(this.intervalId)
          }}
          aria-label="Previous item in gallery"
        />
        {visibleContent.map((x, i) => {
          const { dragging, dragDeltaX, dragInitialX } = this.state
          // Get data ready to position each gallery item correctly
          const posOverflow = Math.floor((position + i) / contents.length)
          const iPos = i - 1
          const opacity = iPos < 0 || iPos > 1 ? 0 : 1
          const translateX = `translateX(calc(${dragging ? dragDeltaX - dragInitialX : 0}px + 64px + (100% + 64px) * ${iPos}))`

          const href = `${isProtocol(x.href) ? '' : prefix}${x.href}`

          return (
            <div
              key={x.uid + posOverflow}
              className="gallery-content soft-shadow"
              style={{
                transform: translateX,
                transition: dragging ? 'none' : undefined,
                opacity: dragging && (dragInitialX - dragDeltaX !== 0) ? 1 : opacity,
              }}
              onMouseDown={(e) => this.startDrag(e)}
              onMouseMove={(e) => this.updateDrag(e)}
              onMouseUp={(e) => {
                if (dragging) {
                  this.stopDrag(e, href)
                } else {
                  this.changePage(href)
                }
              }}
              onTouchStart={(e) => this.startDrag(e)}
              onTouchMove={(e) => this.updateDrag(e)}
              onTouchEnd={(e) => {
                if (dragging) {
                  this.stopDrag(e, href)
                } else {
                  this.changePage(href)
                }
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
          onClick={() => {
            window.clearInterval(this.intervalId)
            this.changePosition(1)
          }}
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
