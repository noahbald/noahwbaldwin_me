import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

import Button from './button'

import './markdown.css'

/**
 * Render markdown document and style it
 * @param {*} props { `fetch` }
 */
class Markdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      peek: true,
      html: null,
    }
    if (props.markdown) {
      this.parseMarkdown()
    }
  }

  componentDidUpdate(prevProps) {
    const { markdown: prevMarkdown } = prevProps
    const { markdown } = this.props

    if (markdown && (prevMarkdown !== markdown)) {
      this.parseMarkdown()
    }
  }

  parseMarkdown() {
    const { markdown } = this.props
    const html = marked(markdown, { sanitise: true })
    this.setState({
      html: { __html: html }
    })
  }

  render() {
    const { peek, html } = this.state
    const { loading } = this.props

    if (loading || !html) {
      return (
        <div className="markdown peek">
          <div className="content skeleton">
            <h1>&nbsp;</h1>
            <h2>&nbsp;</h2>
            <br />
            <p>&nbsp;</p>
            <p>
              &nbsp;
              <br />
              &nbsp;
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>
              &nbsp;
              <br />
              &nbsp;
            </p>
            <br />
            <p>&nbsp;</p>
            <br />
            <h2>nbsp;</h2>
          </div>
        </div>
      )
    }
    return (
      <div className={`markdown ${peek ? 'peek' : ''}`}>
        <div className="content" dangerouslySetInnerHTML={html} />
        {peek ? (<Button className="soft-shadow" type="outline" onClick={() => this.setState({ peek: false })}>Read More</Button>) : null}
      </div>
    )
  }
}

Markdown.propTypes = {
  loading: PropTypes.bool,
  markdown: PropTypes.string,
}

Markdown.defaultProps = {
  loading: false,
  markdown: '',
}

export default Markdown
