import React from 'react'
import PropTypes from 'prop-types'

import Card from './card'

import './feature-list.css'

/**
 * `FeatureListItem` is a feature image, content pair to be rendered within `FeatureList`
 * @param {*} props { `children`, `src`, `alt`, `to`, `skeleton`, `className` }
 * @example
 * <FeatureListItem
 *  src={feaureListImages[i]}
 *  alt="Feature List Image Alternate Text"
 *  to="/"
 *  className="example-feature-list-item"
 * >
 *  <p>This is an example FeatureListItem</p>
 * </FeatureListItem>
 */
export function FeatureListItem(props) {
  const {
    children,
    src,
    alt,
    to,
    skeleton,
    className,
  } = props

  // If lazy loading display template item
  if (skeleton) {
    return (
      <FeatureListItem className={`skeleton ${className}`}>
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
      </FeatureListItem>
    )
  }

  return (
    <div className={`feature-list-item ${className}`}>
      <div className="feature-image">
        <img src={src} alt={alt} />
      </div>
      <Card to={to}>
        {children}
      </Card>
    </div>
  )
}

FeatureListItem.propTypes = {
  /**
   * Content to display within `Card` of `FeatureListItem`
   */
  children: PropTypes.node,
  /**
   * Location of feature image
   */
  src: PropTypes.string,
  /**
   * Alternate text for feature image
   */
  alt: PropTypes.string,
  /**
   * url location passed to `Card`
   */
  to: PropTypes.string,
  /**
   * Is lazy loading in progress?
   */
  skeleton: PropTypes.bool,
  /**
   * Optional class for rendered element
   */
  className: PropTypes.string,
}

FeatureListItem.defaultProps = {
  children: null,
  src: '',
  alt: '',
  to: undefined,
  skeleton: false,
  className: '',
}

/**
 * An object to display `FeatureListItem` within, a compoennt which display an image, content pair
 * Children of `FeatureList` must be a `FeatureListItem`
 * @param {*} props { children, skeleton, className }
 * @example
 * <FeatureList
 *  className="example-feature-list"
 * >
 *  <FeatureListItem {...featureListItemProps} />
 * </FeatureList>
 */
export default function FeatureList(props) {
  const { children, skeleton, className } = props
  if (skeleton) {
    return (
      <FeatureList className="skeleton">
        <FeatureListItem skeleton />
        <FeatureListItem skeleton />
        <FeatureListItem skeleton />
      </FeatureList>
    )
  }

  return (
    <div className={`feature-list ${className}`}>
      {children}
    </div>
  )
}

FeatureList.propTypes = {
  children: PropTypes.instanceOf(FeatureListItem),
  skeleton: PropTypes.bool,
  className: PropTypes.string,
}

FeatureList.defaultProps = {
  children: null,
  skeleton: false,
  className: '',
}
