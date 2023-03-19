import React from 'react'
import { Link } from 'react-router-dom'

import './external-links.scss'

export interface ExternalLinkProps extends React.ComponentProps<typeof Link> {
  rel?: never
  target?: never
}

/**
 * @example
 * <ExternalLink
 *  href={href}
 *  title={title}
 * >
 *  <svg />
 * </ExternalLink>
 */
export const ExternalLink: React.FC<ExternalLinkProps> = ({
  ...linkProps
}) => (
  <Link
    {...linkProps}
    rel="external nofollow"
    target="_blank"
  />
)

export interface ExternalLinksProps {
  children: React.ReactElement<typeof ExternalLink> | React.ReactElement<typeof ExternalLink>[]
}

/**
 * A container for one or more `ExternalLink`
 * @example
 * <ExternalLinks>
 *  <ExternalLink />
 * </ExternalLinks>
 */
const ExternalLinks: React.FC<ExternalLinksProps> = ({ children }) => (
  <div className="external-links">{children}</div>
)
export default ExternalLinks
