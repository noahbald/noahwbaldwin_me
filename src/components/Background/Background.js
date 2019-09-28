import React from 'react'
import SimplexNoise from './../../services/perlin-noise.js'

class Background extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
        this.simplex = new SimplexNoise()
    }

    componentDidMount() {
        if (!this.state.loaded) {
            this.intervalVar = window.setInterval(() => {
                this.setState({loaded: true})
            }, 1000)
        }
    }

    componentWillUnmount() {
        window.clearInterval(this.state.intervalVar)
    }

    render() {
        var rand = (add=0) => {
            return this.simplex.noise(add*10, Date.now()/200000)
        }
        let viewWidth = window.innerWidth
        let viewHeight = window.innerHeight
        let maxDimension = Math.max(viewHeight, viewWidth)

        var cx, cy, rx, ry, px, py
        // circle
        var cr = maxDimension*3

        // rect
        var rSize = maxDimension*6
        var rRot = rand(1)*12.5

        // polygon
        var pWidth = maxDimension*6*1.1547
        var pHeight = maxDimension*6
        var pRot = rand(2)*5

        if (viewWidth > viewHeight) {
            // circle
            cx = cr/0.95 + rand()*viewWidth/3
            cy = rand()*viewHeight*2

            // rect
            rx = -rSize/1.8 + rand(1)*viewWidth/2
            ry = rSize/1.8 + rand(1)*viewHeight/2

            // polygon
            px = -pWidth/1.8 - rand(2)*viewWidth/3
            py = -pHeight/1.8 - rand(2)*viewHeight
        } else {
            // circle
            cy = cr/0.95 + rand()*viewWidth/3
            cx = rand()*viewHeight*2

            // rect
            ry = -rSize/1.8 + rand(1)*viewWidth/2
            rx = rSize/1.8 + rand(1)*viewHeight/2

            // polygon
            py = -pWidth/1.8 - rand(2)*viewWidth/3
            px = -pHeight/1.8 - rand(2)*viewHeight
        }

        return (
            <svg className="background" xmlns="http://www.w3.org/2000/svg" style={{height: "100vh", width: "100%"}}>
              <defs>
                <style>
                  {`.cls-1 {
                    fill: #00315e;
                  }

                  .cls-2, .cls-3, .cls-4 {
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: ` + Math.min(viewHeight, viewWidth) + `px;
                    filter: url(#shadow);
                    transition: transform linear 1s
                  }

                  .cls-2 {
                    stroke: #0073de;
                  }

                  .cls-3 {
                    stroke: #e17381;
                  }

                  .cls-4 {
                    stroke: #c471ed;
                }`}x
                </style>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="16" floodColor="#001d38" floodOpacity="0.1"/>
                    <feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#001d38" floodOpacity="0.025"/>
                </filter>
              </defs>
              <g id="Shapes" data-name="Shapes">
                <circle className="cls-2" cx={viewWidth/2} cy={viewHeight/2} r={cr} style={{transform: "translate("+cx+"px, "+cy+"px)"}}/>
                <rect className="cls-3" x={-(rSize/2)+(viewWidth/2)} y={-(rSize/2)+(viewHeight/2)} width={rSize} height={rSize} style={{transform: "translate("+rx+"px, "+ry+"px) rotate("+rRot+"deg)"}}/>
                <polygon className="cls-4" points={(viewWidth/2)+" "+(-pHeight/2+viewHeight/2)+" "+(-pWidth/2+viewWidth/2)+" "+(pHeight/2+viewHeight/2)+" "+(pWidth/2+viewWidth/2)+" "+(pHeight/2+viewHeight/2)+" "+(viewWidth/2)+" "+(-pHeight/2+viewHeight/2)} style={{transform: "translate("+px+"px, "+py+"px) rotate("+pRot+"deg)"}}/>
              </g>
            </svg>
        )
    }
}

export default Background
