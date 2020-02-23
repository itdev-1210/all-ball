import React from "react";

import styled from "styled-components";
import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";
import Flippy, { FrontSide, BackSide } from "react-flippy";

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstName = styled.h2``;

const LastName = styled.h2`
  margin-left: 0.6rem;
`;

const TopFiveContainer = styled.div`
  flex: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    cursor: pointer;
  }

  @media screen and (min-width: 1500px) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

const BackStatsContainer = styled.div`
  margin-top: 0.9rem;
`;

const FGContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  width: 60%;
`;

const FG3Container = styled(FGContainer)``;
const FTContainer = styled(FGContainer)``;
const RebContainer = styled(FGContainer)``;
const FoulAndTOContainer = styled(FGContainer)``;

const BackSideStat = styled.h3`
 margin 0.8rem;
`;
function PlayerCard(props) {
  const teamAbbreviation = props.playerData.team.abbreviation;
  const playerCardColor = teamHexFirstColors[teamAbbreviation];
  const playerCardSecondColor = teamHexSecondColors[teamAbbreviation];
  const {
    pts,
    stl,
    ast,
    reb,
    blk,
    fg3a,
    fg3m,
    fga,
    fgm,
    fta,
    ftm,
    oreb,
    dreb,
    pf,
    turnover
  } = props.playerData;

  return (
    <TopFiveContainer
      playerCardColor={playerCardColor}
      playerCardSecondColor={playerCardSecondColor}
      teamAbbreviation={teamAbbreviation}
    >
      <Flippy flipOnHover={false} flipOnClick={true} flipDirection="horizontal">
        <FrontSide
          style={{
            background: playerCardColor,
            borderRadius: "2rem",
            border: `solid 0.35rem ${playerCardSecondColor}`,
            color: `${teamAbbreviation === "SAS" ? "#222" : "#fefefe"}`
          }}
        >
          <NameContainer>
            <FirstName>{props.playerData.player.first_name} </FirstName>
            <LastName>{props.playerData.player.last_name}</LastName>
          </NameContainer>
          <h3>Points: {pts}</h3>

          <h3>Assists: {ast}</h3>

          <h3>Rebounds: {reb}</h3>

          <h3>Steals: {stl}</h3>

          <h3>Blocks: {blk}</h3>
        </FrontSide>
        <BackSide
          style={{
            background: playerCardColor,
            borderRadius: "2rem",
            border: `solid 0.35rem ${playerCardSecondColor}`,
            color: `${teamAbbreviation === "SAS" ? "#222" : "#fefefe"}`,
            fontSize: "1.1rem"
          }}
        >
          <BackStatsContainer>
            <FGContainer>
              <BackSideStat>FGA: {fga} </BackSideStat>
              <BackSideStat>FGM: {fgm}</BackSideStat>
            </FGContainer>
            <FG3Container>
              <BackSideStat>FG3A: {fg3a}</BackSideStat>
              <BackSideStat> FG3M: {fg3m}</BackSideStat>
            </FG3Container>
            <FTContainer>
              <BackSideStat>FTA: {fta} </BackSideStat>
              <BackSideStat>FTM: {ftm}</BackSideStat>
            </FTContainer>
            <RebContainer>
              <BackSideStat>OREB: {oreb} </BackSideStat>
              <BackSideStat>DREB: {dreb}</BackSideStat>
            </RebContainer>
            <FoulAndTOContainer>
              <BackSideStat>PF: {pf} </BackSideStat>
              <BackSideStat>TO: {turnover}</BackSideStat>
            </FoulAndTOContainer>
          </BackStatsContainer>
        </BackSide>
      </Flippy>
    </TopFiveContainer>
  );
}

export default PlayerCard;
