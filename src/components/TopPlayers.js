import React, { Component } from 'react';

import PlayerCard from './PlayerCard';

class TopPlayers extends Component {
    constructor() {
        super()
        this.state = {
            players: [],
            statistic: 'points',
            yearList: [2019],
            monthList: [1],
            dayList: [1]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        let currentYear = date.getFullYear();
        let tzOffset = (new Date()).getTimezoneOffset() * 350111; //offset in milliseconds
        let yesterday = (new Date(Date.now() - 1 - tzOffset)).toISOString().split('T')[0];
        let twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0];
        fetch(`https://www.balldontlie.io/api/v1/stats?dates[]=${yesterday}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                let totalPages = data.meta.total_pages
                if (totalPages === 0) {
                    for (let i = currentPage; i <= 4; i++) {
                        fetch(`https://www.balldontlie.io/api/v1/stats?dates[]=${twoDaysAgo}&per_page=100&page=` + i)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({
                                    players: this.state.players.concat(data.data)
                                })
                            })
                    }
                } else {
                    for (let i = currentPage; i <= totalPages; i++) {
                        fetch(`https://www.balldontlie.io/api/v1/stats?dates[]=${yesterday}&per_page=100&page=` + i)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({
                                    players: this.state.players.concat(data.data)
                                })
                            })
                    }
                }
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value },
            () => { console.log(this.state.yearList, this.state.monthList, this.state.dayList) }
        );
    }   

    handleClick(event) {
        event.preventDefault();
        fetch(`https://www.balldontlie.io/api/v1/stats?dates[]=${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                let totalPages = data.meta.total_pages
                for (let i = currentPage; i <= totalPages; i++) {
                    fetch(`https://www.balldontlie.io/api/v1/stats?dates[]=${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&per_page=100&page=` + i)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                players: data.data
                            })
                        })
                }
            })
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

        const years = []
        for (let i = 2020; i > 1984; i--) {
            years.push({ year: i })
        }

        const months = []
        for (let x = 12; x > 0; x--) {
            months.push({ month: x })
        }

        const days = []
        for (let y = 31; y > 0; y--) {
            days.push({ day: y })
        }

        return (
            <div>
                <div>
                    <h1>Top players from {`${this.state.yearList}-${this.state.monthList}-${this.state.dayList}`}</h1>

                    <form>
                        <label>
                            Sort players by:
                        <select name='statistic' value={this.state.statistic} onChange={this.handleChange}>
                                <option value='points'>Points</option>
                                <option value='assists'>Assists</option>
                                <option value='rebounds'>Rebounds</option>
                                <option value='steals'>Steals</option>
                                <option value='blocks'>Blocks</option>
                            </select>
                        </label>

                        <label>
                            Year:
                        <select name='yearList' value={this.state.yearList} onChange={this.handleChange}>
                                {years.map(({ value, year }) => <option value={value} >{year}</option>)}
                            </select>
                        </label>

                        <label>
                            Month:
                        <select name='monthList' value={this.state.monthList} onChange={this.handleChange}>
                                {months.map(({ value, month }) => <option value={value} >{month}</option>)}
                            </select>
                        </label>

                        <label>
                            Day:
                        <select name='dayList' value={this.state.dayList} onChange={this.handleChange}>
                                {days.map(({ value, day }) => <option value={value} >{day}</option>)}
                            </select>
                        </label>

                        <button onClick={this.handleClick}>
                            Search
                        </button>
                    </form>
                </div>

                <div style={{ display: 'flex', margin: '20px' }}>
                    {highestPoints}
                </div>
            </div>
        );
    }
}

export default TopPlayers;