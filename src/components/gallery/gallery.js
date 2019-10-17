import React from 'react'
import negIndex from './../../services/negIndex.js'
import Button from './../button/button.js'

import './gallery.css'

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 0,
            prevLength: this.props.contents.length
        }
    }

    changePosition(delta) {
        let position = this.state.position+delta
        this.setState({position: position})
    }

    getVisibleContent() {
        let visibleContent = []
        for (let i=0; i < 4; i++) {
            visibleContent.push(this.props.contents[negIndex(this.state.position+i-1, this.props.contents.length)])
        }
        return visibleContent
    }

    render() {
        let visibleContent = this.getVisibleContent()
        return (
            <div className="gallery">
                <Button text onClick={() => this.changePosition(-1)}>{'<'}</Button>
                {visibleContent.map((x, i) => {
                    let posOverflow = Math.floor((this.state.position+i)/this.props.contents.length)
                    let iPos = i-1
                    let opacity = 1
                    let translateX = `translateX(calc(64px + (100% + 64px) * ${iPos}))`
                    if (iPos < 0 || iPos > 1) {
                        opacity = 0
                    }
                    return (
                        <div key={x.uid + posOverflow} className="gallery-content" style={{transform: translateX, opacity: opacity}}>
                            <img className="gallery-image" style={{backgroundImage: `url(${x.src})`}} alt={x.uid + posOverflow}></img>
                            <div className="card">
                                <h4><strong>{x.title}</strong> {x.subtitle}</h4>
                            </div>
                        </div>
                    )
                })}
                <Button text onClick={() => this.changePosition(1)}>{'>'}</Button>
            </div>
        )
    }
}
export default Gallery
