import React from 'react';

class GameInfoContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedGame: []
        }
    }

    componentDidMount() {
        fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${this.props.location && this.props.location.state.game}&per_page=100`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    selectedGame: data.data
                })
            })
    }

    render() {
        let teamAbbreviations = this.state.selectedGame.map(x => x.team.abbreviation)

        let homeTeam = [...new Set(teamAbbreviations)]
        let awayTeam = homeTeam.pop()

        let homeTeamRoster = this.state.selectedGame.filter(x => x.team.abbreviation == homeTeam)
        let awayTeamRoster = this.state.selectedGame.filter(x => x.team.abbreviation == awayTeam)

        let awayTeamPoints = awayTeamRoster.reduce((a, b) => a + b.pts, 0)
        let homeTeamPoints = homeTeamRoster.reduce((a, b) => a + b.pts, 0)

        let awayFGAttempts = awayTeamRoster.reduce((a, b) => a + b.fga, 0)
        let homeFGAttempts = homeTeamRoster.reduce((a, b) => a + b.fga, 0)

        let awayFGMade = awayTeamRoster.reduce((a, b) => a + b.fgm, 0)
        let homeFGMade = homeTeamRoster.reduce((a, b) => a + b.fgm, 0)

        let awayFGPercent = (awayFGMade / awayFGAttempts).toFixed(2)
        let homeFGPercent = (homeFGMade / homeFGAttempts).toFixed(2)

        let awayFG3Attempts = awayTeamRoster.reduce((a, b) => a + b.fg3a, 0)
        let homeFG3Attempts = homeTeamRoster.reduce((a, b) => a + b.fg3a, 0)

        let awayFG3Made = awayTeamRoster.reduce((a, b) => a + b.fg3m, 0)
        let homeFG3Made = homeTeamRoster.reduce((a, b) => a + b.fg3m, 0)

        let awayFG3Percent = (awayFG3Made / awayFG3Attempts).toFixed(2)
        let homeFG3Percent = (homeFG3Made / homeFG3Attempts).toFixed(2)

        let awayFTAttempts = awayTeamRoster.reduce((a, b) => a + b.fta, 0)
        let homeFTAttempts = homeTeamRoster.reduce((a, b) => a + b.fta, 0)

        let awayFTMade = awayTeamRoster.reduce((a, b) => a + b.ftm, 0)
        let homeFTMade = homeTeamRoster.reduce((a, b) => a + b.ftm, 0)

        let awayFTPercent = (awayFTMade / awayFTAttempts).toFixed(2)
        let homeFTPercent = (homeFTMade / homeFTAttempts).toFixed(2)

        let awayTeamAssists = awayTeamRoster.reduce((a, b) => a + b.ast, 0)
        let homeTeamAssists = homeTeamRoster.reduce((a, b) => a + b.ast, 0)

        let awayTeamSteals = awayTeamRoster.reduce((a, b) => a + b.stl, 0)
        let homeTeamSteals = homeTeamRoster.reduce((a, b) => a + b.stl, 0)

        let awayTeamRebounds = awayTeamRoster.reduce((a, b) => a + b.reb, 0)
        let homeTeamRebounds = homeTeamRoster.reduce((a, b) => a + b.reb, 0)

        let awayTeamOffRebounds = awayTeamRoster.reduce((a, b) => a + b.oreb, 0)
        let homeTeamOffRebounds = homeTeamRoster.reduce((a, b) => a + b.oreb, 0)

        let awayTeamDefRebounds = awayTeamRoster.reduce((a, b) => a + b.dreb, 0)
        let homeTeamDefRebounds = homeTeamRoster.reduce((a, b) => a + b.dreb, 0)

        let awayTeamBlocks = awayTeamRoster.reduce((a, b) => a + b.blk, 0)
        let homeTeamBlocks = homeTeamRoster.reduce((a, b) => a + b.blk, 0)

        let awayTeamTurnovers = awayTeamRoster.reduce((a, b) => a + b.turnover, 0)
        let homeTeamTurnovers = homeTeamRoster.reduce((a, b) => a + b.turnover, 0)


        return (
            <div>

                <p>Points: {awayTeamPoints}</p>
                <p>Points: {homeTeamPoints}</p>

                <p>FGA: {awayFGAttempts}</p>
                <p>FGA: {homeFGAttempts}</p>

                <p>FGM: {awayFGMade}</p>
                <p>FGM: {homeFGMade}</p>

                <p>FG %: {awayFGPercent}</p>
                <p>FG %: {homeFGPercent}</p>

                <p>FG3A: {awayFG3Attempts}</p>
                <p>FG3A: {homeFG3Attempts}</p>

                <p>FG3M: {awayFG3Made}</p>
                <p>FG3M: {homeFG3Made}</p>

                <p>FG3 %: {awayFG3Percent}</p>
                <p>FG3 %: {homeFG3Percent}</p>

                <p>FTA: {awayFTAttempts}</p>
                <p>FTA: {homeFTAttempts}</p>

                <p>FTM: {awayFTMade}</p>
                <p>FTM: {homeFTMade}</p>

                <p>FT%: {awayFTPercent}</p>
                <p>FT%: {homeFTPercent}</p>

                <p>Assists: {awayTeamAssists}</p>
                <p>Assists: {homeTeamAssists}</p>

                <p>Steals: {awayTeamSteals}</p>
                <p>Steals: {homeTeamSteals}</p>

                <p>Rebounds: {awayTeamRebounds}</p>
                <p>Rebounds:{homeTeamRebounds}</p>

                <p>O. Rebounds: {awayTeamOffRebounds}</p>
                <p>O. Rebounds: {homeTeamOffRebounds}</p>

                <p>D. Rebounds: {awayTeamDefRebounds}</p>
                <p>D. Rebounds: {homeTeamDefRebounds}</p>

                <p>Blocks: {awayTeamBlocks}</p>
                <p>Blocks: {homeTeamBlocks}</p>

                <p>Turnovers: {awayTeamTurnovers}</p>
                <p>Turnovers: {homeTeamTurnovers}</p>
            </div>
        )
    }
}

export default GameInfoContainer;