import React from "react";

import styled from "styled-components";
import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";

const TopFiveContainer = styled.div`
    border-radius 20px;
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
    flex: 1;
    color: #FEFEFE;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    :hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        cursor: pointer;
      }

    @media screen and (max-width:1000px) {
        margin-top: 10px;
    }
`;

function PlayerCard(props) {
  const teamAbbreviation = props.playerData.team.abbreviation;
  const playerCardColor = teamHexFirstColors[teamAbbreviation];
  const playerCardSecondColor = teamHexSecondColors[teamAbbreviation];

  return (
    <TopFiveContainer
      style={{
        background: `${playerCardColor}`,
        border: `6px solid ${playerCardSecondColor}`
      }}
    >
      <div>
        <h2>
          {props.playerData.player.first_name}{" "}
          {props.playerData.player.last_name}
        </h2>
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
