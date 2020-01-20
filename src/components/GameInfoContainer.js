import React, { Component } from 'react';

import styled from 'styled-components';

import {
    ResponsiveContainer, 
    BarChart, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    Bar
} from "recharts";

const TeamContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

class GameInfoContainer extends Component {
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
        
        let awayTeam = [...new Set(teamAbbreviations)]
        let homeTeam = awayTeam.pop()

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

        let teamHexColors = {
          ATL: '#E03A3E', BKN: '#000000', BOS: '#007A33', CHA: '#1D1160', CHI: '#CE1141', CLE: '#860038', DAL: '#00538C', DEN: '#0E2240', 
          DET: '#C8102E', GSW: '#1D428A', HOU: '#CE1141', IND: '#002D62', LAC: '#1D1160', LAL: '#552583', MEM: '#5D76A9', MIA: '#98002E', 
          MIL: '#00471B', MIN: '#0C2340', NOP: '#85714D', NYK: '#F58426', OKC: '#007AC1', ORL: '#0077C0', PHI: '#006BB6', PHX: '#1D1160', 
          POR: '#E03A3E', SAC: '#5A2D81', SAS: '#C4CED4', TOR: '#CE1141', UTA: '#002B5C', WAS: '#002B5C'
        }

        const teamHexSecondColors = {
          ATL: '#C1D32F', BKN: '#FFFFFF', BOS: '#BA9653', CHA: '#00788C', CHI: '#000000', CLE: '#FDBB30', DAL: '#002B5E', DEN: '#FEC524', 
          DET: '#1D42BA', GSW: '#FFC72C', HOU: '#000000', IND: '#FDBB30', LAC: '#C8102E', LAL: '#FDB927', MEM: '#12173F', MIA: '#F9A01B', 
          MIL: '#EEE1C6', MIN: '#236192', NOP: '#0C2340', NYK: '#0072CE', OKC: '#EF3B24', ORL: '#C4CED4', PHI: '#ED174C', PHX: '#E56020', 
          POR: '#000000', SAC: '#63727A', SAS: '#000000', TOR: '#000000', UTA: '#00471B', WAS: '#E31837'
        }

        let homeTeamColor = teamHexColors[homeTeam]
        let awayTeamColor = teamHexColors[awayTeam]

        let homeTeamSecondColor = teamHexSecondColors[homeTeam]
        let awayTeamSecondColor = teamHexSecondColors[awayTeam]

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
            <TeamContainer>
              <div style={{display: 'flex'}}>
              <h1 style={{color: `${awayTeamColor}`, webkitTextStrokeWidth: '1px', WebkitTextStrokeColor: `${awayTeamSecondColor}`}}>{awayTeam}</h1> 
              <h1 style={{marginLeft: '15px'}}>{awayTeamPoints}</h1>
              </div>
              <div style={{display: 'flex'}}>
              <h1 style={{color: `${homeTeamColor}`, webkitTextStrokeWidth: '1px', WebkitTextStrokeColor: `${homeTeamSecondColor}`}}>{homeTeam}</h1> 
              <h1 style={{marginLeft: '15px'}}>{homeTeamPoints}</h1>
              </div>
            </TeamContainer>
            <div style={{marginLeft: '18%'}}>
              <ResponsiveContainer width={'80%'} height={750}>
                <BarChart 
                  data={data} 
                  layout="vertical"
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip/>
                  <Legend />
                  <Bar dataKey={`${awayTeam}`} fill={`${awayTeamColor}`} stroke={`${awayTeamSecondColor}`} strokeWidth={3} />
                  <Bar dataKey={`${homeTeam}`} fill={`${homeTeamColor}`} stroke={`${homeTeamSecondColor}`} strokeWidth={3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
    } 
}

export default GameInfoContainer;
