import React, { useState } from 'react'
import classNames from 'classnames'

import Button from './button'

import './feature-box.scss'
import IResume from '../data/IResume'

export interface FeatureBoxProps {
  content?: IResume['record']['items']
  className?: string
  loading?: boolean
}

/**
 * Displays image and feature content pairs
 * @example
 * <FeatureBox
 *  content={[
 *    {
 *      title: 'Lorem Ipsum',
 *      subtitle: 'Dolor Etcetera',
 *      image: imageUrl,
 *      contents: [
 *        {
 *          icon: iconUrl,
 *          title: 'Lorem Ipsum',
 *          body: 'Dolor Etcetera',
 *        },
 *      ]...
 *    }
 *  ]...}
 * />
 */
const FeatureBox: React.FC<FeatureBoxProps> = ({
  content,
  className,
  loading,
}) => {
  const [option, setOption] = useState(0)

  const {
    title,
    image,
    imageAlt,
    contents,
  } = content?.[option] || {}
  const [prevIndex, nextIndex] = React.useMemo(
    () => [
      content && option === 0 ? content.length - 1 : option - 1,
      content && option === content.length - 1 ? 0 : option + 1,
    ],
    [option, content],
  )

  return (
    <div
      className={classNames('feature-box', className, {
        skeleton: loading,
      })}
    >
      <div className="feature-box__image">
        {!loading && (
          <img src={image} alt={imageAlt} />
        )}
      </div>
      <div className="feature-box__content">
        <div className="feature-box__titlebar">
          {loading && !content ? (
            <>
              <Button as="div" softShadow />
              <h3>&nbsp;</h3>
              <Button as="div" softShadow />
            </>
          ) : (
            <>
              <Button
                softShadow
                onClick={() => setOption(prevIndex)}
              >
                {content?.[prevIndex]?.title}
              </Button>
              <h3>{title}</h3>
              <Button
                softShadow
                onClick={() => setOption(nextIndex)}
              >
                {content?.[nextIndex]?.title}
              </Button>
            </>
          )}
        </div>
        {
          contents?.map(({
            icon,
            title: contentTitle,
            body,
            uid,
          }, i) => (
            <React.Fragment
              key={uid}
            >
              <img
                className={classNames('icon', {
                  'highlight--primary': (i + option) % 3 === 0,
                  'highlight--secondary': (i + option) % 3 === 1,
                  'highlight--tertiary': (i + option) % 3 === 2,
                })}
                src={icon}
                alt={contentTitle}
              />
              <p>
                <strong>{contentTitle}</strong>
                &nbsp;&mdash;&nbsp;
                {body}
              </p>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
export default FeatureBox
