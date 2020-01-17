import React from 'react';

import styled from 'styled-components';

const CardContainer = styled.div`  
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 1px;
    padding: 50px 10px;

    @media screen and (max-width:1440px) {
        padding: 50px 5px;
   }
`

const BoxScore = styled.div`
    border-radius:15px;
    padding: 0px 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        cursor: pointer;
      }
`

function GameCard(props) {
    let teamHexColors = {
        ATL: '#E03A3E', BKN: '#000000', BOS: '#007A33', CHA: '#1D1160', CHI: '#CE1141', CLE: '#860038', DAL: '#00538C', DEN: '#0E2240', 
        DET: '#C8102E', GSW: '#1D428A', HOU: '#CE1141', IND: '#002D62', LAC: '#1D1160', LAL: '#552583', MEM: '#5D76A9', MIA: '#98002E', 
        MIL: '#00471B', MIN: '#0C2340', NOP: '#85714D', NYK: '#F58426', OKC: '#007AC1', ORL: '#0077C0', PHI: '#006BB6', PHX: '#1D1160', 
        POR: '#E03A3E', SAC: '#5A2D81', SAS: '#C4CED4', TOR: '#CE1141', UTA: '#002B5C', WAS: '#002B5C'
      }

      let homeTeam = props.gameData.home_team.abbreviation;
      let awayTeam = props.gameData.visitor_team.abbreviation;

      let homeTeamColor = teamHexColors[homeTeam];
      let awayTeamColor = teamHexColors[awayTeam];

    return (
            <CardContainer>
                <BoxScore onClick={props.onClick} style={{background: `linear-gradient(to bottom, ${awayTeamColor} 50%, ${homeTeamColor} 50%)`}}>
                <div style={{display: 'flex'}}>
                <h2 style={{color:'#FEFEFE', marginLeft: '8px'}}> {props.gameData.visitor_team.abbreviation} </h2>
                <h2 style={{color:'#FEFEFE', marginLeft: '25px'}}> {props.gameData.visitor_team_score}</h2>
                </div>
                <span style={{color:'#FEFEFE', marginLeft: '56px', fontWeight: '900'}}> @ </span>
                <div style={{display: 'flex'}}>
                <h2 style={{color: '#FEFEFE', paddingLeft: '8px'}}>{props.gameData.home_team.abbreviation} </h2>
                <h2 style={{color:'#FEFEFE', marginLeft: '25px'}}>{props.gameData.home_team_score}</h2>
                </div>
                </BoxScore>
            </CardContainer>
    );
}

export default GameCard;
