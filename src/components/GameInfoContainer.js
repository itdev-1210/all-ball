import React from 'react';

class GameInfoContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedGame: []
        }
    }

    componentDidMount() {
        fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${this.props.location && this.props.location.state.game}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    selectedGame: data.data
                })
            })
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default GameInfoContainer;