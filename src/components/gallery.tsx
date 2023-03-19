import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import Button from './button'
import Card from './card'
import IProjects from '../data/IProjects'

import arrowLeft from './component-assets/arrow-left.svg'
import arrowRight from './component-assets/arrow-right.svg'

import './gallery.scss'

const INTERVAL_TIMEOUT = 3000

type TouchOrMouseEvent = React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>

const isTouchEvent = (e: TouchOrMouseEvent): e is React.TouchEvent<HTMLDivElement> => (
  e.nativeEvent instanceof TouchEvent
)

export interface GalleryProps {
  contents: IProjects['record']
  loading?: boolean
}

/**
 * A carousel which displays up to two items at a time
 * Each item of the `Gallery` is an image, title-subtitle pair
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
const Gallery: React.FC<GalleryProps> = ({
  contents,
  loading,
}) => {
  const [position, setPosition] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragInitialX, setDragInitialX] = useState(0)
  const [dragDeltaX, setDragDeltaX] = useState(0)
  const [interval, setInterval] = useState(-1)

  const navigate = useNavigate()

  const visibleContent = useMemo(() => (
    Array.from(new Array(4), (_, i) => contents.at && contents.at(
      (((position + i - 1) % contents.length) + contents.length) % contents.length,
    ))
  ), [contents, position])

  const changePosition = useCallback((delta: number) => {
    setPosition(position + delta)
  }, [position, setPosition])

  const handleDragStart = React.useCallback((e: TouchOrMouseEvent) => {
    const { pageX, button } = isTouchEvent(e)
      ? { pageX: e.touches[0]?.pageX, button: 0 }
      : { pageX: e.pageX, button: e.button }
    if (!dragging && button === 0) {
      window.clearInterval(interval)
      setDragging(true)
      setDragInitialX(pageX)
      setDragDeltaX(pageX)
    }
  }, [dragging, interval])

  const handleDrag = React.useCallback((e: TouchOrMouseEvent) => {
    const pageX = isTouchEvent(e)
      ? e.touches[0].pageX
      : e.pageX

    if (dragging) {
      setDragDeltaX(pageX)
      e.preventDefault()
      e.stopPropagation()
    }
  }, [dragging])

  const handleDragStop = React.useCallback((e: TouchOrMouseEvent, href: string): void => {
    if (!dragging) {
      return navigate(href)
    }

    const pageX = isTouchEvent(e)
      ? e.touches[0].pageX
      : e.pageX

    const finalDragDeltaX = dragInitialX - pageX

    if (Math.abs(finalDragDeltaX) > 128) {
      changePosition(Math.sign(finalDragDeltaX))
      e.stopPropagation()
      e.preventDefault()
    } else if (Math.abs(finalDragDeltaX) < 64) {
      navigate(href)
    }
    setDragging(false)
  }, [])

  useEffect(() => {
    const newInterval = window.setInterval(() => changePosition(1), INTERVAL_TIMEOUT)
    setInterval(newInterval)
    return () => window.clearInterval(newInterval)
  }, [])

  return (
    <div className={classNames('gallery', { skeleton: loading })}>
      {loading ? (
        <>
          <Button
            as="div"
            type="text"
            aria-label="Previous item in gallery"
          />
          <div className="gallery__content soft-shadow" style={{ transform: 'translateX(calc(64px + (100% + 64px) * 0))' }}>
            <div className="gallery__image" />
            <Card>
              <h4>
                &nbsp;
              </h4>
            </Card>
          </div>
          <div className="gallery__content soft-shadow" style={{ transform: 'translateX(calc(64px + (100% + 64px) * 1))' }}>
            <div className="gallery__image" />
            <Card>
              <h4>
                &nbsp;
              </h4>
            </Card>
          </div>
          <Button
            as="div"
            type="text"
            aria-label="Next item in gallery"
          />
        </>
      ) : (
        <>
          <Button
            type="text"
            icon={arrowLeft}
            onClick={() => {
              changePosition(-1)
              window.clearInterval(interval)
            }}
            aria-label="Previous item in gallery"
          />
          {visibleContent.map((item, i) => {
            const positionOverflow = Math.floor(position + i) / contents.length
            const iPosition = i - 1
            const opacity = iPosition < 0 || iPosition > 1 ? 0 : 1
            const translateX = `translateX(calc(${dragging ? dragDeltaX - dragInitialX : 0}px + 64px + (100% + 64px) * ${iPosition}))`

            return item && (
              <div
                key={item.uid + String(positionOverflow)}
                className="gallery__content soft-shadow"
                style={{
                  transform: translateX,
                  transition: dragging ? 'none' : undefined,
                  opacity: dragging && (dragInitialX - dragDeltaX !== 0) ? 1 : opacity,
                }}
                onClick={() => navigate(item.href)}
                onTouchStart={handleDragStart}
                onTouchMove={handleDrag}
                onTouchEnd={(e) => handleDragStop(e, item.href)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(item.href)}
                role="presentation"
                tabIndex={opacity - 1}
              >
                <img src={item.src} alt="" className="gallery__image" />
                <Card
                  to={item.href}
                  toTitle={item.title}
                >
                  <h4>
                    <strong>{item.title}</strong>
                    &nbsp;&mdash;&nbsp;
                    {item.subtitle}
                  </h4>
                </Card>
              </div>
            )
          })}
          <Button
            type="text"
            icon={arrowRight}
            onClick={() => {
              changePosition(1)
              window.clearInterval(interval)
            }}
            aria-label="Next item in gallery"
          />
        </>
      )}
    </div>
  )
}
export default Gallery
