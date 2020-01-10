import React from 'react';

import styled from 'styled-components';

const BoxScoreResults = styled.div`  
    align-items: center;
    border: 1px solid red;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    margin: 8px;
    padding: 50px 20px;
`

function GameCard(props) {
    return (
        <div onClick={props.onClick}>
            <BoxScoreResults>
                <p>{props.gameData.visitor_team.abbreviation} {props.gameData.visitor_team_score}</p>
                <span> @ </span>
                <p>{props.gameData.home_team.abbreviation} {props.gameData.home_team_score}</p>
            </BoxScoreResults>
        </div>
    );
}

export default GameCard;