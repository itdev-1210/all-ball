import React, { Component } from 'react';

import PlayerCard from './PlayerCard';

class TopPlayers extends Component {
    constructor() {
        super()
        this.state = {
            players: [],
            statistic: 'points'
        }
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        this.setState({ statistic: event.target.value });
    }

    render() {
        let highestPoints;
        if (this.state.statistic === 'assists') {
            highestPoints = [].concat(this.state.players)
                .sort((a, b) => b.ast - a.ast).splice(0, 5)
                .map((playerData, i) =>
                    <PlayerCard
                        key={i}
                        playerData={playerData}
                    />);
        } else if (this.state.statistic === 'points') {
            highestPoints = [].concat(this.state.players)
                .sort((a, b) => b.pts - a.pts).splice(0, 5)
                .map((playerData, i) =>
                    <PlayerCard
                        key={i}
                        playerData={playerData}
                    />);
        } else if (this.state.statistic === 'rebounds') {
            highestPoints = [].concat(this.state.players)
                .sort((a, b) => b.reb - a.reb).splice(0, 5)
                .map((playerData, i) =>
                    <PlayerCard
                        key={i}
                        playerData={playerData}
                    />);
        } else if (this.state.statistic === 'steals') {
            highestPoints = [].concat(this.state.players)
                .sort((a, b) => b.stl - a.stl).splice(0, 5)
                .map((playerData, i) =>
                    <PlayerCard
                        key={i}
                        playerData={playerData}
                    />);
        } else if (this.state.statistic === 'blocks') {
            highestPoints = [].concat(this.state.players)
                .sort((a, b) => b.blk - a.blk).splice(0, 5)
                .map((playerData, i) =>
                    <PlayerCard
                        key={i}
                        playerData={playerData}
                    />);
        }
        return (
            <div>
                <form>
                    <label>
                        Sort players by:
                        <select value={this.state.statistic} onChange={this.handleChange}>
                            <option value='points'>Points</option>
                            <option value='assists'>Assists</option>
                            <option value='rebounds'>Rebounds</option>
                            <option value='steals'>Steals</option>
                            <option value='blocks'>Blocks</option>
                        </select>
                    </label>
                </form>
                {highestPoints}
            </div >
        );
    }
}

export default TopPlayers;