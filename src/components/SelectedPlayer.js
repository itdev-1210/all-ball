import React from "react";

import styled from "styled-components";
import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";

const NameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 2.5rem;
`;

const TeamNameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstName = styled.h1`
  margin-bottom: 0rem;
  margin-top: 0rem;
  text-align: center;
`;

const LastName = styled(FirstName)`
  margin-left: 1.3rem;
`;

const ProportionContainer = styled(TeamNameContainer)``;

const VerticalLine = styled.div`
  border-right: 0.2rem solid #fefefe;
  height: 3rem;
  margin-left: 2rem;
  margin-right: 1rem;
  margin-top: 1.5rem;
`;

const BioInnerContainer = styled.div`
  background: ${props => props.playerCardColor};
  border: solid 0.35rem ${props => props.playerCardSecondColor};
  border-radius: 1.5rem;
  color: #fefefe;
  margin: auto;
  margin-bottom: 2rem;
  width: 50%;

  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

function SelectedPlayer(props) {
  const heightAndWeight = props.player.height_feet ? (
    <ProportionContainer>
      <h3>
        {props.player.height_feet}'{props.player.height_inches}
      </h3>
      <VerticalLine />
      <h3>{props.player.weight_pounds}</h3>
    </ProportionContainer>
  ) : null;

  const teamAbbreviation = props.player.team.abbreviation;
  const playerCardColor = teamHexFirstColors[teamAbbreviation];
  const playerCardSecondColor = teamHexSecondColors[teamAbbreviation];

  return (
    <BioInnerContainer
      playerCardColor={playerCardColor}
      playerCardSecondColor={playerCardSecondColor}
    >
      <NameContainer>
        <FirstName>{props.player.first_name} </FirstName>
        <LastName>{props.player.last_name}</LastName>
      </NameContainer>
      <TeamNameContainer>
        <h2>{props.player.team.full_name}</h2>
      </TeamNameContainer>
      {heightAndWeight}
    </BioInnerContainer>
  );
}

export default SelectedPlayer;
