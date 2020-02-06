import React, { useState, useEffect } from "react";

import TeamGameChart from "./TeamGameChart";
import TeamGameLog from "./TeamGameLog";

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
      <div>
        <h3 onClick={toggleTeamGameLog}>Team Game Log</h3>
        <h3 onClick={toggleTeamChart}>Team Comparison</h3>
      </div>
      {chartOrLog}
    </div>
  );
}

export default GameInfoContainer;
