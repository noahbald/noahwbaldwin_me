import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

import Button from './button'

import './markdown.css'

class Markdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      peek: true,
      data: '',
    }
  }

  componentDidMount() {
    this.fetchMarkdown()
  }


  getMarkup() {
    const { data } = this.state
    return { __html: data }
  }

  async fetchMarkdown() {
    const { fetch, importSrc, path } = this.props
    const regImage = /<img.+?src=[\\]?["|'](?:.+?)["|'].+?[/img|/>|>]/g
    const regSrc = /(?:<img .*?src=[\\]?["|'])(.*?)(?:["|'].*?[/img|/>|>])/

    // Fetch markdown from server
    const response = await fetch()
    if (!response.ok) {
      // Failed to fetch
      this.setState({ loading: false, error: true })
      console.log(`Failed to get ok response from ${path}`)
    } else {
      // Handle markdown
      const text = await response.text()
      let markup = marked(text, { sanitize: true })
      const images = markup.match(regImage)
      const replacement = images.slice()

      let imageSources = []
      let src
      for (let i = 0; i < images.length; i += 1) {
        [, src] = images[i].match(regSrc)
        try {
          src = importSrc(src)
        } catch (e) {
          src = ''
        }
        imageSources.push(src)
      }
      imageSources = await Promise.all(imageSources)
      for (let i = 0; i < images.length; i += 1) {
        src = imageSources[i].default
        replacement[i] = replacement[i].replace(/(<img .*?src=[\\]?["|'])(.*?)(["|'].*?[/img|/>|>])/, `$1${src}$3`)
      }
      for (let i = 0; i < images.length; i += 1) {
        markup = markup.replace(`<p>${images[i]}</p>`, replacement[i])
      }
      this.setState({ loading: false, data: markup })
    }
  }

  render() {
    const { peek: statePeek, error, loading } = this.state
    const { peek: propsPeek, id } = this.props
    let peek = ''
    if (statePeek || propsPeek) {
      peek = 'peek'
    }
    if (error) {
      return (
        <div className="markdown" id={id}>Error Loading Markup</div>
      )
    } if (loading) {
      return (
        <div className="markdown peek" id={id}>
          <div className="content skeleton" id={id}>
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
      <div className={`markdown ${peek}`}>
        <div className="content" id={id} dangerouslySetInnerHTML={this.getMarkup()} />
        {peek ? (<Button className="soft-shadow" outline onClick={() => this.setState({ peek: false })}>Read More</Button>) : null}
      </div>
    )
  }
}

Markdown.propTypes = {
  fetch: PropTypes.func,
  importSrc: PropTypes.func,
  path: PropTypes.string,
  peek: PropTypes.string,
  id: PropTypes.string,
}

Markdown.defaultProps = {
  fetch: async () => {},
  importSrc: async () => {},
  path: '',
  peek: '',
  id: '',
}

export default Markdown
