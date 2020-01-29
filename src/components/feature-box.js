import React from 'react'
import PropTypes from 'prop-types'

import Button from './button'

import './feature-box.css'

/**
 * Displays image and feature content pairs
 * @param {*} props { `content`, `className`, `loading` }
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

    // Lazy loading tempalte
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

    // Data including and immediately surrounding selected option in data
    const titleBarContent = [
      content[option === 0 ? content.length - 1 : option - 1],
      content[option],
      content[option === content.length - 1 ? 0 : option + 1],
    ]
    // Content of selected option
    const selectedContent = content[option]
    // Image of selected option
    const featureImage = selectedContent.image

    return (
      <div className={`feature-box ${className}`}>
        <div
          className="feature-image"
          style={{
            backgroundImage: `url(${featureImage})`,
          }}
        />
        <div className="feature-content">
          <div className="feature-titlebar">
            {
              titleBarContent.map((item, i) => {
                const { title, uid } = item
                // If item is option, render header
                if (i === 1) {
                  return (
                    <h3 key={uid}>
                      {title}
                    </h3>
                  )
                }
                // If item is before option, render left button
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
                // If item is after option, render right button
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
                // Cycle through highlight colors
                const highlights = [
                  'primary',
                  'secondary',
                  'tertiary',
                ]
                const highlight = highlights[(i + option) % 3]
                // Render content
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
  /**
   * Content from data
   */
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
