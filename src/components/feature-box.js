import React from 'react'
import PropTypes from 'prop-types'

import Button from './button'

import './feature-box.css'

/**
 * Displays image and feature content pairs
 * @example
 * <FeatureBox
 *  content={featureBoxContent}
 * />
 */
export default class FeatureBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      option: 0,
    }
  }

  render() {
    const { option } = this.state
    const { content, className, loading } = this.props

    if (loading) {
      return (
        <div className={`feature-box skeleton ${className}`}>
          <div className="feature-image">
            <div className="img" />
          </div>
          <div className="feature-content">
            <div className="feature-titlebar">
              <Button className="soft-shadow" />
              <h3 style={{ width: '50%' }}>&nbsp;</h3>
              <Button className="soft-shadow" />
            </div>
            <div className="highlight-grey icon" />
            <p />
            <div className="highlight-grey icon" />
            <p />
          </div>
        </div>
      )
    }

    const titleBarContent = [
      content[option === 0 ? content.length - 1 : option - 1],
      content[option],
      content[option === content.length - 1 ? 0 : option + 1],
    ]
    const selectedContent = content[option]
    const featureImage = selectedContent.image

    return (
      <div className={`feature-box ${className}`}>
        <div className="feature-image">
          <img alt="placeholder" src={featureImage} loading="lazy" />
        </div>
        <div className="feature-content">
          <div className="feature-titlebar">
            {
              titleBarContent.map((item, i) => {
                const { title, uid } = item
                if (i === 1) {
                  return (
                    <h3 key={uid}>
                      {title}
                    </h3>
                  )
                }
                if (i < 1) {
                  return (
                    <Button
                      className="soft-shadow"
                      key={uid}
                      onClick={() => {
                        this.setState({
                          option: option === 0 ? content.length - 1 : option - 1,
                        })
                      }}
                    >
                      {title}
                    </Button>
                  )
                }
                if (i > 1) {
                  return (
                    <Button
                      className="soft-shadow"
                      key={uid}
                      onClick={() => {
                        this.setState({
                          option: option === content.length - 1 ? 0 : option + 1,
                        })
                      }}
                    >
                      {title}
                    </Button>
                  )
                }
                return null
              })
            }
          </div>
          {
              selectedContent.contents.map((item, i) => {
                const {
                  icon,
                  title,
                  body,
                  uid,
                } = item
                const highlights = [
                  'primary',
                  'secondary',
                  'tertiary',
                ]
                const highlight = highlights[(i + option) % 3]
                return (
                  <React.Fragment key={uid}>
                    <div
                      style={{ backgroundImage: `url(${icon})` }}
                      src={icon}
                      alt={title}
                      className={`highlight-${highlight} icon`}
                    />
                    <p>
                      <strong>{title}</strong>
                      &nbsp;&mdash;&nbsp;
                      {body}
                    </p>
                  </React.Fragment>
                )
              })
            }
        </div>
      </div>
    )
  }
}

FeatureBox.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      uid: PropTypes.string,
      image: PropTypes.string,
      contents: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string,
          title: PropTypes.string,
          body: PropTypes.string,
        }),
      ),
    }),
  ),
  className: PropTypes.string,
  loading: PropTypes.bool,
}

FeatureBox.defaultProps = {
  content: [
    {
      title: '',
      uid: '',
      image: '',
      contents: [],
    },
  ],
  className: '',
  loading: false,
}
