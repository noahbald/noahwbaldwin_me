import React, { useState } from 'react'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import classNames from 'classnames'

import Button from './button'

import './markdown.scss'
import useWithBucketFile from '../hooks/useWithBucketData'

export interface MarkdownProps {
  loading?: boolean
  markdown?: string
}

/**
 * Render markdown document and style it
 */
const Markdown: React.FC<MarkdownProps> = ({
  loading,
  markdown,
}) => {
  const [peek, setPeek] = useState(true)

  const markdownString = useWithBucketFile(markdown, 'text')

  const dangerousHTML = React.useMemo(() => (
    marked?.parse(typeof markdownString === 'string' ? markdownString : '')
  ), [markdownString])

  const html = React.useMemo(() => ({
    __html: sanitizeHtml(dangerousHTML, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat('img', 'h1', 'h2', 'h3'),
      allowedAttributes: {
        img: ['src', 'alt'],
        a: ['href', 'name', 'target', 'title'],
      },
      selfClosing: ['img'],
    }),
  }), [dangerousHTML])

  if (loading || markdownString === null) {
    return (
      <div className="markdown peek">
        <article className="markdown__content skeleton">
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
        </article>
      </div>
    )
  }

  return (
    <div className={classNames('markdown', { peek })}>
      {/* eslint-disable-next-line react/no-danger */}
      <article className="markdown__content" dangerouslySetInnerHTML={html} />
      {peek && (
        <Button
          softShadow
          type="outline"
          onClick={() => setPeek(false)}
        >
          Read More
        </Button>
      )}
    </div>
  )
}
export default Markdown
