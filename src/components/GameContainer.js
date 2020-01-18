import React, { Component } from 'react';

import GameCard from './GameCard';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    overflow: auto;

    &::-webkit-scrollbar-track {
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	    border-radius: 10px;
        background-color: #F5F5F5;
        margin: 0 50px;
}

    &::-webkit-scrollbar {
        background-color: white
}

    &::-webkit-scrollbar-thumb {
	    border-radius: 10px;
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
}

    @media screen and (max-width: 1440px) {
        justify-content: normal;
}
`

const FlexScroll = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    padding: 17px 20px;
`

const tzOffset = (new Date()).getTimezoneOffset() * 350111; //offset in milliseconds
const yesterday = (new Date(Date.now() - 1 - tzOffset)).toISOString().split('T')[0];
const date = new Date();

class GameContainer extends Component {
    constructor() {
        super()
        this.state = {
            games: [],
            yearList: [],
            monthList: [],
            dayList: [],
            gameCardHeader: '',
            noGameMessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleGameClick = this.handleGameClick.bind(this);
    }

    componentDidMount() {
        let twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0];
        fetch(`https://www.balldontlie.io/api/v1/games/?start_date=[]${yesterday}&end_date=[]${yesterday}`)
            .then(response => response.json())
            .then(data => {
                let totalPages = data.meta.total_pages
                if (totalPages === 0) {
                    fetch(`https://www.balldontlie.io/api/v1/games/?start_date=[]${twoDaysAgo}&end_date=[]${twoDaysAgo}&per_page=100`)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                games: data.data
                            })
                        })
                } else {
                    fetch(`https://www.balldontlie.io/api/v1/games/?start_date=[]${yesterday}&end_date=[]${yesterday}&per_page=100`)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                games: data.data
                            })
                        })
                }
            })
    }

    getGameMessage() {
        const today = date.toISOString().split('T')[0];
        const addZeroToMonth = this.state.monthList < 10 ? `${'0' + this.state.monthList}` : `${this.state.monthList}`
        const selectedDate = `${this.state.yearList}-${addZeroToMonth}-${this.state.dayList}`;
        let gameDayMessage;

        if (!`${this.state.yearList}` || !`${this.state.monthList}` || !`${this.state.dayList}`) {
            gameDayMessage = ''
        } else if (selectedDate > today){
            gameDayMessage = `Games scheduled on ${selectedDate}`;
        } else if (selectedDate == yesterday) {
            gameDayMessage = 'Game results from yesterday';
        } else if (selectedDate == today) {
            gameDayMessage = `Games scheduled for today`;
        } else if (selectedDate < today) {
            gameDayMessage = `Game results from ${selectedDate}`;
        } 
        this.setState({
            gameCardHeader: gameDayMessage
        },
            () => { console.log(this.state.gameCardHeader) }
        )
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        },
            () => { console.log(this.state.yearList, this.state.monthList, this.state.dayList) }
        );
    }

    handleGameClick(value) {
        this.props.history.push({
            pathname: `/games/${value.id}`,
            state: {
                game: `${value.id}`
            }
        });
    }

    handleSearchClick(event) {
        this.setState({
            noGameMessage: ''
        })
        this.getGameMessage();
        event.preventDefault();
         if (`${this.state.yearList}` && `${this.state.monthList}` && `${this.state.dayList}`) {
        fetch(`https://www.balldontlie.io/api/v1/games/?start_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&end_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                let currentPage = data.meta.current_page
                let totalPages = data.meta.total_pages
                if (totalPages > 0) {
                for (let i = currentPage; i <= totalPages; i++) {
                    fetch(`https://www.balldontlie.io/api/v1/games/?start_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&end_date=[]${this.state.yearList}-${this.state.monthList}-${this.state.dayList}&per_page=100&page=` + i)
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                games: data.data
                            })
                        })
                }
            } else {
                this.setState({
                    noGameMessage: 'No games scheduled. Try a different date!'
                })
            }
            })
        } 
    }

    render() {
        let gameResults;

        if (!this.state.noGameMessage) {
            gameResults = this.state.games.map((gameData, id) =>
            <GameCard
                key={id}
                onClick={() => { this.handleGameClick(gameData) }}
                gameData={gameData}
            />);
        } else {
            gameResults = null
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
                    <form>
                        <label>
                            Year:
                        <select name='yearList' value={this.state.yearList} onChange={this.handleChange}>
                            <option value="" disabled select hidden>-</option>
                            {years.map(({ value, year }) => <option value={value}>{year}</option>)}
                            </select>
                        </label>

                        <label>
                            Month:
                        <select name='monthList' value={this.state.monthList} onChange={this.handleChange}>
                            <option value="" disabled select hidden>-</option>
                            {months.map(({ value, month }) => <option value={value} >{month}</option>)}
                            </select>
                        </label>

                        <label>
                            Day:
                        <select name='dayList' value={this.state.dayList} onChange={this.handleChange}>
                            <option value="" disabled select hidden>-</option>
                            {days.map(({ value, day }) => <option value={value} >{day}</option> )}
                        </select>
                        </label>
                        <button onClick={this.handleSearchClick}>
                            Search
                        </button>
                        <h1> {!this.state.noGameMessage ? this.state.gameCardHeader : this.state.noGameMessage} </h1>
                    </form>
                </div>
           
                <Container>
                    <FlexScroll>
                        {gameResults}
                    </FlexScroll>
                </Container>
            </div>
        );
    }
}

export default withRouter(GameContainer);
