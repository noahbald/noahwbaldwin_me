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
  skeletonChild?: React.ReactNode
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
  skeletonChild,
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
        {skeleton
          ? skeletonChild
          : children}
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
  skeletonChild?: React.ReactElement
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
  skeletonChild,
}) => {
  if (skeleton) {
    return (
      <FeatureList className="skeleton">
        <FeatureListItem skeleton skeletonChild={skeletonChild} to="" />
        <FeatureListItem skeleton skeletonChild={skeletonChild} to="" />
        <FeatureListItem skeleton skeletonChild={skeletonChild} to="" />
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
