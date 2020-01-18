import React from 'react';

import styled from 'styled-components';

const TopFiveContainer = styled.div`
    border-radius 15px;
    flex: 0 1 20%;
    flex-wrap: wrap;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    color: #FEFEFE;
`

function PlayerCard(props) {
    let teamHexColors = {
        ATL: '#E03A3E', BKN: '#000000', BOS: '#007A33', CHA: '#1D1160', CHI: '#CE1141', CLE: '#860038', DAL: '#00538C', DEN: '#0E2240', 
        DET: '#C8102E', GSW: '#1D428A', HOU: '#CE1141', IND: '#002D62', LAC: '#1D1160', LAL: '#552583', MEM: '#5D76A9', MIA: '#98002E', 
        MIL: '#00471B', MIN: '#0C2340', NOP: '#85714D', NYK: '#F58426', OKC: '#007AC1', ORL: '#0077C0', PHI: '#006BB6', PHX: '#1D1160', 
        POR: '#E03A3E', SAC: '#5A2D81', SAS: '#C4CED4', TOR: '#CE1141', UTA: '#002B5C', WAS: '#002B5C'
      }

    const teamAbbreviation = props.playerData.team.abbreviation;
    const playerCardColor = teamHexColors[teamAbbreviation];

    const teamHexSecondColors = {
        ATL: '#C1D32F', BKN: '#FFFFFF', BOS: '#BA9653', CHA: '#00788C', CHI: '#000000', CLE: '#FDBB30', DAL: '#002B5E', DEN: '#FEC524', 
        DET: '#1D42BA', GSW: '#FFC72C', HOU: '#000000', IND: '#FDBB30', LAC: '#C8102E', LAL: '#FDB927', MEM: '#12173F', MIA: '#F9A01B', 
        MIL: '#EEE1C6', MIN: '#236192', NOP: '#0C2340', NYK: '#0072CE', OKC: '#EF3B24', ORL: '#C4CED4', PHI: '#ED174C', PHX: '#E56020', 
        POR: '#000000', SAC: '#63727A', SAS: '#000000', TOR: '#000000', UTA: '#00471B', WAS: '#E31837'
      }
   
    const playerCardSecondColor = teamHexSecondColors[teamAbbreviation];

    return (
        <TopFiveContainer style={{background: `${playerCardColor}`, border: `6px solid ${playerCardSecondColor}`}}>
            <div>
                <h2>{props.playerData.player.first_name} {props.playerData.player.last_name} </h2>
            </div>
            <h3>Points: {props.playerData.pts}</h3>
            
            <h3>Assists: {props.playerData.ast}</h3>
        
            <h3>Rebounds: {props.playerData.reb}</h3>
    
            <h3>Steals: {props.playerData.stl}</h3>
        
            <h3>Blocks: {props.playerData.blk}</h3>
        </TopFiveContainer>
    );
}

export default PlayerCard;