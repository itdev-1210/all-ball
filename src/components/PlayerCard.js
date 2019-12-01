import React from 'react';


function PlayerCard(props) {
    return (
        <div style={{ border: '1px solid black' }}>
            {props.playerData.player.first_name} {props.playerData.player.last_name}
            <p>Points: {props.playerData.pts}</p>
            <p>Assists: {props.playerData.ast}</p>
            <p>Rebounds: {props.playerData.reb}</p>
            <p>Steals: {props.playerData.stl}</p>
            <p>Blocks: {props.playerData.blk}</p>
        </div>
    );
}

export default PlayerCard;