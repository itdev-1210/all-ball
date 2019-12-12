import React, { Component } from 'react';

class PlayerSearch extends Component {
    constructor() {
        super()
        this.state = {
            allPlayers: [],
            input: '',
            loading: false,
            playerDetails: []
        }
        this.handleSearchClick = this.handleSearchClick.bind(this)
        this.handlePlayerClick = this.handlePlayerClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handlePlayerClick(value) {
        this.setState({
            allPlayers: [],
            playerDetails: [value]
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
            playerDetails: []
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
                                console.log(data)
                                this.setState({
                                    allPlayers: this.state.allPlayers.concat(data.data),
                                    loading: false
                                })

                            })
                    }
                })
        }
    }
    render() {
        let searchedPlayers = this.state.loading ?
            <p> LOADING </p>
            : this.state.allPlayers.map(d =>
                <li key={d.id} onClick={() => { this.handlePlayerClick(d) }}>
                    {d.first_name} {d.last_name}
                </li>)
        let chosenPlayer = this.state.playerDetails.map(d =>
            <li key={d.id}>
                {d.first_name} {d.last_name} {d.team.city}
            </li>)

        return (
            <div>
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
                    {searchedPlayers}
                </div>
                <div>
                    {chosenPlayer}
                </div>
            </div>
        );
    }
}

export default PlayerSearch;