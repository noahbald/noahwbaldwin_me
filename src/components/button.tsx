import React from 'react'

import './button.scss'
import classNames from 'classnames'

export type ButtonProps<T extends React.ElementType | React.ComponentType = 'button'> = React.PropsWithChildren<React.ComponentPropsWithoutRef<T>> & {
  type?: 'solid' | 'outline' | 'text' | 'disabled',
  softShadow?: boolean
  className?: string
  icon?: string,
  as?: T
}

/**
 * A clickable button.
 * Returns a button-like link if `to` is given
 * @example
 * <Button
 *  type="outline"
 *  className="main-button"
 *  icon={buttonIcon}
 * >
 *  Click Me!
 * </Button>
 */
const Button = <T extends React.ElementType>({
  className,
  children,
  type = 'solid',
  softShadow,
  icon,
  as,
  ...asProps
}: ButtonProps<T>) => {
  const As = as || 'button'
  return (
    <As
      className={classNames('button', className, {
        [`button--${type}`]: type,
        'button--icon': icon,
        'button--soft-shadow': softShadow,
      })}
      {...asProps}
    >
      {icon && (
        <div className="button__icon" style={{ backgroundImage: `url(${icon})` }} />
      )}
      {children}
    </As>
  )
}
export default Button
