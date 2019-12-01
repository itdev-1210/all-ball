import React from 'react';

function GameCard(props) {
    return (
        <div>
            <p>{props.gameData.visitor_team.full_name} {props.gameData.visitor_team_score}</p>
            <span> @ </span>
            <p>{props.gameData.home_team.full_name} {props.gameData.home_team_score}</p>
        </div>
    );
}

export default GameCard;