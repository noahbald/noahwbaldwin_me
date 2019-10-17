import React from 'react'
import './button.css'

function Button(props) {
    let className = 'button'
    if (props.outline) {
        className += ' outline'
    } else if (props.text) {
        className += ' text'
    }
    if (props.disabled) {
        className += ' disabled'
    }
    if (props.className) {
        className += ' ' + props.className
    }
    return (
        <button className={className} onClick={() => props.onClick()}>{props.children}</button>
    )
}
export default Button
