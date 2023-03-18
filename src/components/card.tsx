import React from 'react'
import { Link } from 'react-router-dom'

import './card.scss'
import classNames from 'classnames'

export interface CardProps extends React.PropsWithChildren {
  className?: string
  to?: string
  toTitle?: string
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  to,
  toTitle,
}) => (
  <div
    className={classNames('card', className)}
  >
    {children}
    {to != null && (
      <Link
        className="card__highlight"
        to={to}
        title={toTitle}
      />
    )}
  </div>
)
export default Card
