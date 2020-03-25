import React from "react";

import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";
import styled from "styled-components";

const PlayerInnerContainer = styled.div`
  background-color: ${props => props.playerCardColor};
  border: 0.2rem solid ${props => props.playerCardSecondColor};
  color: ${props => (props.teamAbbreviation === "SAS" ? "#222" : "#fefefe")};
  display: inline;
  flex: 0 1 20%;
  font-size: 1.5rem;
  font-weight: bold;
  list-style: none;
  margin: 0.3rem;
  padding: 0.7rem;
  text-align: center;

  :hover {
    cursor: pointer;
  }

  @media screen and (min-width: 414px) {
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
  }
`;

const PlayerFirstName = styled.div``;

const PlayerLastName = styled.div`
  margin-left: 0;

  @media screen and (min-width: 414px) {
    margin-left: 0.5rem;
  }
`;

function PlayerSearchResults(props) {
  const teamAbbreviation = props.players.team.abbreviation;

  const playerCardColor = teamHexFirstColors[teamAbbreviation];
  const playerCardSecondColor = teamHexSecondColors[teamAbbreviation];

  return (
    <PlayerInnerContainer
      onClick={props.onClick}
      playerCardColor={playerCardColor}
      playerCardSecondColor={playerCardSecondColor}
      teamAbbreviation={teamAbbreviation}
    >
      <PlayerFirstName>{props.players.first_name}</PlayerFirstName>
      <PlayerLastName>{props.players.last_name}</PlayerLastName>
    </PlayerInnerContainer>
  );
}

export default PlayerSearchResults;
