import React from 'react';
import Background from './components/Background/Background.js'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div id="background">
                <Background></Background>
            </div>
        )
    }
}

export default App;
