import React, { Component } from 'react';

import GameCard from './GameCard';

class GameContainer extends Component {
    constructor() {
        super()
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        let date = new Date();
        let currentYear = date.getFullYear();
        let tzOffset = (new Date()).getTimezoneOffset() * 350111; //offset in milliseconds
        let yesterday = (new Date(Date.now() - 1 - tzOffset)).toISOString().split('T')[0];
        fetch(`https://www.balldontlie.io/api/v1/games/?seasons[]=${currentYear}&start_date=[]${yesterday}&end_date=[]${yesterday}`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                let totalPages = data.meta.total_pages
                for (let i = currentPage; i <= totalPages; i++) {
                    fetch(`https://www.balldontlie.io/api/v1/games/?seasons[]=${currentYear}&start_date=[]${yesterday}&end_date=[]${yesterday}&per_page=100&page=` + i)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                games: data.data
                            })
                        })
                }
            })
    }

    render() {
        const gameInformation = this.state.games.map((gameData, id) =>
            <GameCard
                key={id}
                gameData={gameData}
            />);
        return (
            <div>
                {gameInformation}
            </div>
        );
    }
}

export default GameContainer;