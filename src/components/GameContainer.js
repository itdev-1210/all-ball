import React, { Component } from 'react';

import GameCard from './GameCard';

class GameContainer extends Component {
    constructor() {
        super()
        this.state = {
            games: [],
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

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value },
            () => { console.log(this.state.yearList, this.state.monthList, this.state.dayList) }
        );
    }

    handleClick(event) {
        event.preventDefault();
        fetch(`https://www.balldontlie.io/api/v1/games/?seasons[]=${this.state.yearList}&start_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&end_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                let totalPages = data.meta.total_pages
                for (let i = currentPage; i <= totalPages; i++) {
                    fetch(`https://www.balldontlie.io/api/v1/games/?seasons[]=${this.state.yearList}&start_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&end_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&per_page=100&page=` + i)
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

        const years = []
        for (let i = 2020; i > 1984; i--) {
            years.push({ year: i })
        };

        const months = []
        for (let x = 12; x > 0; x--) {
            months.push({ month: x })
        };

        const days = []
        for (let y = 31; y > 0; y--) {
            days.push({ day: y })
        };

        return (
            <div>
                <div>
                    <form>
                        <label>
                            Year:
                        <select name='yearList' value={this.state.yearList} onChange={this.handleChange}>
                                {years.map(({ value, year }) => <option value={value}>{year}</option>)}
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
                    {gameInformation}
                </div>
            </div>
        );
    }
}

export default GameContainer;