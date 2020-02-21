import React from "react";

import styled from "styled-components";
import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";

const NameContainer = styled.div`
  color: #fefefe;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 2rem;
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

const TeamName = styled.h2`
  font-size 2rem
`;

const ProportionContainer = styled(TeamNameContainer)``;

const VerticalLine = styled.div`
  border-right: 0.2rem solid #fefefe;
  color: #fefefe;
  height: 3rem;
  margin-left: 1.5rem;
  margin-right: 1.2rem;
  margin-top: 0.5rem;
`;

const BioInnerContainer = styled.div`
  background: ${props => props.playerCardColor};
  border: solid 0.35rem ${props => props.playerCardSecondColor};
  border-radius: 1.5rem;
  color: #fefefe;
  margin: 4rem auto;
  padding: 2rem 0rem;
  width: 40rem;

  @media screen and (min-width: 600px) {
    width: 50rem;
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
        <TeamName>{props.player.team.full_name}</TeamName>
      </TeamNameContainer>
      {heightAndWeight}
    </BioInnerContainer>
  );
}

export default SelectedPlayer;
