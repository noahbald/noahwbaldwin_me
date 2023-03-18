import React from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import Card from './card'

import './feature-list.scss'

export interface FeatureListItemProps extends React.PropsWithChildren {
  className?: string
  src?: string
  alt?: string
  to: string
  toTitle?: string
  skeleton?: boolean;
}

/**
 * `FeatureListItem` is a feature image, content pair to be rendered within `FeatureList`
 * @example
 * <FeatureListItem
 *  src={featureListImages[i]}
 *  alt="Feature List Image Alternate Text"
 *  to="/"
 *  className="example-feature-list-item"
 * >
 *  <p>This is an example FeatureListItem</p>
 * </FeatureListItem>
 */
export const FeatureListItem: React.FC<FeatureListItemProps> = ({
  children,
  className,
  src,
  alt,
  to,
  toTitle,
  skeleton,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className={classNames('feature-list__item', className, { skeleton })}
      onClick={() => navigate(to)}
      role="presentation"
    >
      <img
        className="feature-list__image"
        src={src}
        alt={alt}
      />
      <Card
        to={to}
        toTitle={toTitle}
      >
        {skeleton ? (
          <>
            <h4>&nbsp;</h4>
            <p>&nbsp;</p>
            <p
              style={{
                width: '15%',
              }}
            >
              &nbsp;
            </p>
            <p
              style={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                width: '33%',
              }}
            />
            <p
              style={{
                position: 'absolute',
                bottom: 32,
                right: 32,
                width: '33%',
              }}
            />
          </>
        ) : children}
      </Card>
    </div>
  )
}

export interface FeatureListProps {
  className?: string
  children?: (
    React.ReactElement<typeof FeatureListItem> | React.ReactElement<typeof FeatureListItem>[]
  )
  skeleton?: boolean
}

/**
 * An object to display `FeatureListItem` within, a component which display an image, content pair
 * Children of `FeatureList` must be a `FeatureListItem`
 * @example
 * <FeatureList
 *  className="example-feature-list"
 * >
 *  <FeatureListItem {...featureListItemProps} />
 * </FeatureList>
 */
const FeatureList: React.FC<FeatureListProps> = ({
  children,
  className,
  skeleton,
}) => {
  if (skeleton) {
    return (
      <FeatureList className="skeleton">
        <FeatureListItem skeleton to="" />
        <FeatureListItem skeleton to="" />
        <FeatureListItem skeleton to="" />
      </FeatureList>
    )
  }

  return (
    <div className={classNames('feature-list', className)}>
      {children}
    </div>
  )
}
export default FeatureList
