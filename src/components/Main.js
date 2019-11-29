import React, { Component } from 'react';

import TopPlayers from './TopPlayers'
import GameContainer from './GameContainer'

class Main extends Component {
    state = {}
    render() {
        return (
            <div>
                <GameContainer />
                <TopPlayers />
            </div>
        );
    }
}

export default Main;