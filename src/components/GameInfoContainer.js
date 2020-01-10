import React from 'react';

import {
    ResponsiveContainer, 
    BarChart, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    Bar
} from "recharts";

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

        let awayFGPercent = ((awayFGMade / awayFGAttempts).toFixed(2) * 100)
        let homeFGPercent = ((homeFGMade / homeFGAttempts).toFixed(2) * 100)

        let awayFG3Attempts = awayTeamRoster.reduce((a, b) => a + b.fg3a, 0)
        let homeFG3Attempts = homeTeamRoster.reduce((a, b) => a + b.fg3a, 0)

        let awayFG3Made = awayTeamRoster.reduce((a, b) => a + b.fg3m, 0)
        let homeFG3Made = homeTeamRoster.reduce((a, b) => a + b.fg3m, 0)

        let awayFG3Percent = ((awayFG3Made / awayFG3Attempts).toFixed(2) * 100)
        let homeFG3Percent = ((homeFG3Made / homeFG3Attempts).toFixed(2) * 100)

        let awayFTAttempts = awayTeamRoster.reduce((a, b) => a + b.fta, 0)
        let homeFTAttempts = homeTeamRoster.reduce((a, b) => a + b.fta, 0)

        let awayFTMade = awayTeamRoster.reduce((a, b) => a + b.ftm, 0)
        let homeFTMade = homeTeamRoster.reduce((a, b) => a + b.ftm, 0)

        let awayFTPercent = ((awayFTMade / awayFTAttempts).toFixed(2) * 100)
        let homeFTPercent = ((homeFTMade / homeFTAttempts).toFixed(2) * 100)
        
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

        const data = [
            {
              "name": 'FG Attempts',
              [awayTeam]: awayFGAttempts,
              [homeTeam]: homeFGAttempts
            },
            {
              "name": 'FG Made',
              [awayTeam]: awayFGMade,
              [homeTeam]: homeFGMade
            },
            {
              "name": 'FG %',
              [awayTeam]: awayFGPercent,
              [homeTeam]: homeFGPercent
            },
            {
              "name": 'FG3 Attempts',
              [awayTeam]: awayFG3Attempts,
              [homeTeam]: homeFG3Attempts
            },
            {
              "name": 'FG3 Made',
              [awayTeam]: awayFG3Made,
              [homeTeam]: homeFG3Made
            },
            {
              "name": 'FG3 %',
              [awayTeam]: awayFG3Percent,
              [homeTeam]: homeFG3Percent
            },
            {
              "name": 'FT Attempts',
              [awayTeam]: awayFTAttempts,
              [homeTeam]: homeFTAttempts
            },
            {
              "name": 'FT Made',
              [awayTeam]: awayFGMade,
              [homeTeam]: homeFGMade
            },
            {
              "name": 'FT %',
              [awayTeam]: awayFTPercent,
              [homeTeam]: homeFTPercent
            },
            {
              "name": 'Assists',
              [awayTeam]: awayTeamAssists,
              [homeTeam]: homeTeamAssists
            },
            {
              "name": "Steals",
              [awayTeam]: awayTeamSteals,
              [homeTeam]: homeTeamSteals
            },
            {
              "name": "Rebounds",
              [awayTeam]: awayTeamRebounds,
              [homeTeam]: homeTeamRebounds
            },
             {
              "name": "OFF Rebounds",
              [awayTeam]: awayTeamOffRebounds,
              [homeTeam]: homeTeamOffRebounds
            },
            {
              "name": "DEF Rebounds",
              [awayTeam]: awayTeamDefRebounds,
              [homeTeam]: homeTeamDefRebounds
            },
           {
              "name": "Blocks",
              [awayTeam]: awayTeamBlocks,
              [homeTeam]: homeTeamBlocks
            },
            {
              "name": "Turnovers",
              [awayTeam]: awayTeamTurnovers,
              [homeTeam]: homeTeamTurnovers
            },
          ]

        return (
          <div>
            <div>
              <h1>{awayTeam}: {awayTeamPoints}</h1>
              <h1>{homeTeam}: {homeTeamPoints}</h1>
            </div>
            <BarChart 
              width={600} 
              height={800} 
              data={data} 
              layout="vertical"
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip/>
              <Legend />
              <Bar dataKey={`${awayTeam}`} fill="#8884d8" />
              <Bar dataKey={`${homeTeam}`} fill="#82ca9d" />
            </BarChart>
            </div>
        )
    } 
}

export default GameInfoContainer;
