import React from "react";

import styled from "styled-components";
import { teamHexFirstColors } from "../teamhexcolors";

const CardContainer = styled.div`
  align-items: center;
  display: inline;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 1rem 0.2rem;
`;

const GameStatusContainer = styled.div`
  display: flex;
  font-size: 1.1rem;
  font-weight: 700;
  justify-content: center;
`;

const GameTime = styled.p`
  margin-left: ${props =>
    props.gameStatus.includes("Qtr") ? "0.5rem" : "0rem"};
`;

const BoxScore = styled.div`
  border-radius: 1.5rem;
  padding: 0rem 1.6rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    box-shadow: 0 1.4rem 2.8rem rgba(0, 0, 0, 0.25),
      0 1rem 1rem rgba(0, 0, 0, 0.22);
    cursor: pointer;
  }
`;

const HomeTeamContainer = styled.div`
  display: flex;
`;

const HomeTeam = styled.h2`
  color: ${props => (props.homeTeam === "SAS" ? "#222" : "#fefefe")};
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 0.2rem;
`;

const HomeTeamScore = styled(HomeTeam)`
  color: ${props => (props.homeTeam === "SAS" ? "#222" : "#fefefe")};
  margin-bottom: 0.3rem;
  margin-top: 0.2rem;
  margin-left: 1.5rem;
`;

const AtSymbolContainer = styled.div`
  text-align: center;
`;

const AtSymbol = styled.span`
  color: #fefefe;
  font-size: 0.9rem;
  font-weight: 700;
`;

const AwayTeam = styled.h2`
  color: ${props => (props.awayTeam === "SAS" ? "#222" : "#fefefe")};
  font-size: 1.3rem;
  margin-bottom: 0.1rem;
  margin-top: 0.92rem;
`;

const AwayTeamScore = styled(HomeTeamScore)`
  color: ${props => (props.awayTeam === "SAS" ? "#222" : "#fefefe")};
  margin-bottom: 0.1rem;
  margin-top: 1rem;
`;

const AwayTeamContainer = styled(HomeTeamContainer)``;

function GameCard(props) {
  const homeTeam = props.gameData.home_team.abbreviation;
  const awayTeam = props.gameData.visitor_team.abbreviation;
  const awayScore = props.gameData.visitor_team_score;
  const homeScore = props.gameData.home_team_score;

  const homeTeamColor = teamHexFirstColors[homeTeam];
  const awayTeamColor = teamHexFirstColors[awayTeam];

  return (
    <CardContainer>
      <GameStatusContainer gameStatus={props.gameData.status}>
        <p>{props.gameData.status} </p>
        <GameTime gameStatus={props.gameData.status}>
          {props.gameData.time}
        </GameTime>
      </GameStatusContainer>
      <BoxScore
        onClick={props.onClick}
        style={{
          background: `linear-gradient(to bottom, ${awayTeamColor} 50%, ${homeTeamColor} 50%)`
        }}
      >
        <AwayTeamContainer>
          <AwayTeam awayTeam={awayTeam}> {awayTeam} </AwayTeam>
          <AwayTeamScore awayTeam={awayTeam}>
            {awayScore !== 0 && awayScore}
          </AwayTeamScore>
        </AwayTeamContainer>
        <AtSymbolContainer>
          <AtSymbol>@</AtSymbol>
        </AtSymbolContainer>
        <HomeTeamContainer>
          <HomeTeam homeTeam={homeTeam}>{homeTeam} </HomeTeam>
          <HomeTeamScore homeTeam={homeTeam}>
            {homeScore !== 0 && homeScore}
          </HomeTeamScore>
        </HomeTeamContainer>
      </BoxScore>
    </CardContainer>
  );
}

export default GameCard;
