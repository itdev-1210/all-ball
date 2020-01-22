import React from 'react';

function SelectedPlayer(props) {
    return (
      <div>
        <h1>{props.player.first_name}</h1>
        <h1>{props.player.last_name}</h1>
        <h1>{props.player.team.full_name}</h1>
        <h2>{props.player.height_feet}'{props.player.height_inches}"</h2>
        <h2>{props.player.weight_pounds}</h2>
        </div>
    );
}

export default SelectedPlayer;
