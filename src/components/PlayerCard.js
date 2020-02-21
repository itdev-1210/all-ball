import React from "react";

import styled from "styled-components";
import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstName = styled.h2``;

const LastName = styled.h2`
  margin-left: 0.6rem;
`;

const TopFiveContainer = styled.div`
  background: ${props => props.playerCardColor};
  border: solid 0.35rem ${props => props.playerCardSecondColor}; 
  border-radius 2rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  color: ${props => (props.teamAbbreviation === "SAS" ? "#222" : "#fefefe")};
  flex: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
      0 1rem 1rem rgba(0, 0, 0, 0.22);
    cursor: pointer;
  }

  @media screen and (min-width: 1500px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

function PlayerCard(props) {
  const teamAbbreviation = props.playerData.team.abbreviation;
  const playerCardColor = teamHexFirstColors[teamAbbreviation];
  const playerCardSecondColor = teamHexSecondColors[teamAbbreviation];

  return (
    <TopFiveContainer
      playerCardColor={playerCardColor}
      playerCardSecondColor={playerCardSecondColor}
      teamAbbreviation={teamAbbreviation}
    >
      <NameContainer>
        <FirstName>{props.playerData.player.first_name} </FirstName>
        <LastName>{props.playerData.player.last_name}</LastName>
      </NameContainer>
      <h3>Points: {props.playerData.pts}</h3>

      <h3>Assists: {props.playerData.ast}</h3>

      <h3>Rebounds: {props.playerData.reb}</h3>

      <h3>Steals: {props.playerData.stl}</h3>

      <h3>Blocks: {props.playerData.blk}</h3>
    </TopFiveContainer>
  );
}

export default PlayerCard;
