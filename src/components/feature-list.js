import React from 'react'
import PropTypes from 'prop-types'

import Card from './card'

import './feature-list.css'

export function FeatureListItem(props) {
  const {
    children,
    src,
    alt,
    to,
    skeleton,
    className,
  } = props
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
  children: PropTypes.node,
  src: PropTypes.string,
  alt: PropTypes.string,
  to: PropTypes.string,
  skeleton: PropTypes.bool,
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
