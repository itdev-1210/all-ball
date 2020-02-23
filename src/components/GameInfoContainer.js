import React, { useState, useEffect } from "react";

import TeamGameChart from "./TeamGameChart";
import TeamGameLog from "./TeamGameLog";
import styled from "styled-components";

const ComparisonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 1.3rem;
  margin: auto;
  margin-bottom: 0rem;
  width: 35rem;

  @media screen and (min-width: 600px) {
    width: 50rem
  }
`;

const GameLog = styled.h3`
  color: ${props => (!props.isTeamLog ? `red` : `gray`)};
  border-bottom: ${props => (!props.isTeamLog ? `0.2rem solid red` : "none")};
  font-size: 1.3rem;
  margin-bottom: 0rem;
  padding-bottom: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;

const TeamChart = styled.h3`
  color: ${props => (!props.isTeamChart ? `red` : `gray`)};
  border-bottom: ${props => (!props.isTeamChart ? `0.2rem solid red` : "none")};
  font-size: 1.3rem;
  margin-bottom: 0rem;
  padding-bottom: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;

function GameInfoContainer(props) {
  const [selectedGame, setSelectedGame] = useState([]);
  const [isTeamLog, setIsTeamLog] = useState(false);
  const [isTeamChart, setIsTeamChart] = useState(true);

  const getGameStats = () => {
    fetch(
      `https://www.balldontlie.io/api/v1/stats?game_ids[]=${props.location.state.game}&per_page=100`
    )
      .then(response => response.json())
      .then(data => {
        setSelectedGame(data.data);
      });
  };

  useEffect(() => {
    getGameStats();
  }, []);

  const toggleTeamChart = () => {
    if (!isTeamLog) {
      setIsTeamLog(prevState => !prevState);
      setIsTeamChart(prevState => !prevState);
    }
  };

  const toggleTeamGameLog = () => {
    if (!isTeamChart) {
      setIsTeamLog(prevState => !prevState);
      setIsTeamChart(prevState => !prevState);
    }
  };

  const teamAbbreviations = selectedGame.map(x => x.team.abbreviation);

  const awayTeam = [...new Set(teamAbbreviations)];
  const homeTeam = awayTeam.pop();

  const homeTeamRoster = selectedGame.filter(
    x => x.team.abbreviation == homeTeam
  );
  const awayTeamRoster = selectedGame.filter(
    x => x.team.abbreviation == awayTeam
  );

  const teamChart = (
    <TeamGameChart
      awayTeam={awayTeam}
      homeTeam={homeTeam}
      homeTeamRoster={homeTeamRoster}
      awayTeamRoster={awayTeamRoster}
    />
  );

  const teamLog = (
    <TeamGameLog
      awayTeam={awayTeam}
      homeTeam={homeTeam}
      homeTeamRoster={homeTeamRoster}
      awayTeamRoster={awayTeamRoster}
    />
  );

  const chartOrLog = isTeamLog ? teamChart : teamLog;

  return (
    <div>
      <ComparisonContainer>
        <GameLog
          onClick={toggleTeamGameLog}
          isTeamLog={isTeamLog}
        >
          Team Game Log
        </GameLog>
        <TeamChart
          onClick={toggleTeamChart}
          isTeamChart={isTeamChart}
        >
          Team Comparison
        </TeamChart>
      </ComparisonContainer>
      {chartOrLog}
    </div>
  );
}

export default GameInfoContainer;
