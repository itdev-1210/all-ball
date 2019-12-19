import React, { Component } from 'react';

import PlayerSearchResults from './PlayerSearchResults';
import PlayerStats from './PlayerStats';
import PlayerGameLogs from './PlayerGameLogs';

class PlayerSearch extends Component {
    constructor() {
        super()
        this.state = {
            allPlayers: [],
            input: '',
            loading: false,
            playerDetails: [],
            playerStats: [],
            playerGameLogs: [],
            statSwitch: false
        }
        this.handleSearchClick = this.handleSearchClick.bind(this)
        this.handlePlayerClick = this.handlePlayerClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleClick = this.toggleClick.bind(this)
    }

    handlePlayerClick(value) {
        this.setState({
            allPlayers: [],
            playerDetails: [value]
        })
        fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${value.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    playerStats: data.data
                })
            })
        fetch(`https://www.balldontlie.io/api/v1/stats?seasons[]=2019&player_ids[]=${value.id}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    playerGameLogs: data.data
                })
            })
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }

    handleSearchClick() {
        this.setState({
            allPlayers: [],
            playerDetails: [],
            playerStats: [],
            playerGameLogs: []
        })
        if (this.state.input.length > 2) {
            fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.input}&per_page=100`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        loading: true
                    })
                    let currentPage = data.meta.current_page
                    let totalPages = data.meta.total_pages
                    for (let i = currentPage; i <= totalPages; i++) {
                        fetch(`https://www.balldontlie.io/api/v1/players?search=${this.state.input}&per_page=100&page=` + i)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({
                                    allPlayers: this.state.allPlayers.concat(data.data),
                                    loading: false
                                })
                            })
                    }
                })
        }
    }

    toggleClick() {
        this.setState(prevState => ({
            statSwitch: !prevState.statSwitch
        }))
    }

    render() {
        let searchedPlayers = this.state.loading ?
            <p> LOADING </p>
            : this.state.allPlayers.map((players, id) =>
                <PlayerSearchResults
                    key={id}
                    onClick={() => { this.handlePlayerClick(players) }}
                    players={players}
                />);

        let chosenPlayer = this.state.playerDetails.map(d =>
            <li key={d.id}>
                {d.first_name} {d.last_name} {d.team.city}
            </li>);

        let seasonAverages = this.state.playerStats.map((seasonStats, id) =>
            <PlayerStats
                key={id}
                seasonStats={seasonStats}
            />);

        let gameLogs = this.state.playerDetails.length !== 0 ?
            <PlayerGameLogs
                logs={this.state.playerGameLogs}
            />
            : null

        let statSwitch = this.state.statSwitch ? seasonAverages : gameLogs

        let toggleStatsButton = this.state.playerDetails.length !== 0 ?
            <button onClick={this.toggleClick}>
                Switch stats
            </button>
            : null

        return (
            <div>
                {console.log(this.state.playerDetails)}
                <div>
                    <form>
                        <input
                            type='text'
                            name='input'
                            value={this.state.input}
                            onChange={this.handleChange}
                        >
                        </input>
                    </form>
                </div>
                <button onClick={this.handleSearchClick}>
                    Search
                </button>
                <div>
                    {toggleStatsButton}
                    {searchedPlayers}
                </div>
                <div>
                    {chosenPlayer}
                </div>
                <div>
                    {statSwitch}
                </div>
            </div>
        );
    }
}

export default PlayerSearch;