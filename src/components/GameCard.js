import React from 'react';

function GameCard(props) {
    return (
        <div onClick={props.onClick}>
            <p>{props.gameData.visitor_team.abbreviation} {props.gameData.visitor_team_score}</p>
            <span> @ </span>
            <p>{props.gameData.home_team.abbreviation} {props.gameData.home_team_score}</p>
        </div>
    );
}

export default GameCard;