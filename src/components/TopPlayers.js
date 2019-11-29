import React, { Component } from 'react';

import PlayerCard from './PlayerCard';

class TopPlayers extends Component {
    constructor() {
        super()
        this.state = {
            players: []
        }
    }

    componentDidMount() {
        let date = new Date();
        let currentYear = date.getFullYear();
        let tzOffset = (new Date()).getTimezoneOffset() * 350111; //offset in milliseconds
        let yesterday = (new Date(Date.now() - 1 - tzOffset)).toISOString().split('T')[0];
        fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=${currentYear}&dates[]=${yesterday}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                let totalPages = data.meta.total_pages
                for (let i = currentPage; i <= totalPages; i++) {
                    fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=${currentYear}&dates[]=${yesterday}&per_page=100&page=` + i)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                players: this.state.players.concat(data.data)
                            })
                        })
                }
            })
    }

    render() {
        const highestPoints = [].concat(this.state.players)
            .sort((a, b) => b.pts - a.pts).splice(0, 5)
            .map((playerData, i) =>
                 <PlayerCard 
                 key={i} 
                 playerData={playerData}
                 /> );

        return (
            <div>
                {highestPoints}
            </div>
        );
    }
}

export default TopPlayers;