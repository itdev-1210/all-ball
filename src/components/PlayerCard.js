import React from 'react';

import styled from 'styled-components';

const TopFiveContainer = styled.div`
    border: 3px solid black;
    border-radius 20px;
    flex: 0 1 20%;
    flex-wrap: wrap;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
`

function PlayerCard(props) {
    let teamHexColors = {
        ATL: '#E03A3E', BKN: '#000000', BOS: '#007A33', CHA: '#1D1160', CHI: '#CE1141', CLE: '#860038', DAL: '#00538C', DEN: '#0E2240', 
        DET: '#C8102E', GSW: '#1D428A', HOU: '#CE1141', IND: '#002D62', LAC: '#1D1160', LAL: '#552583', MEM: '#5D76A9', MIA: '#98002E', 
        MIL: '#00471B', MIN: '#0C2340', NOP: '#85714D', NYK: '#F58426', OKC: '#007AC1', ORL: '#0077C0', PHI: '#006BB6', PHX: '#1D1160', 
        POR: '#E03A3E', SAC: '#5A2D81', SAS: '#C4CED4', TOR: '#CE1141', UTA: '#002B5C', WAS: '#002B5C'
      }

    let teamAbbreviation = props.playerData.team.abbreviation;
    let playerCardColor = teamHexColors[teamAbbreviation];

    return (
        <TopFiveContainer style={{background: `${playerCardColor}`, color: '#FEFEFE'}}>
            {props.playerData.player.first_name} {props.playerData.player.last_name}
            <p>Points: {props.playerData.pts}</p>
            <p>Assists: {props.playerData.ast}</p>
            <p>Rebounds: {props.playerData.reb}</p>
            <p>Steals: {props.playerData.stl}</p>
            <p>Blocks: {props.playerData.blk}</p>
        </TopFiveContainer>
    );
}

export default PlayerCard;