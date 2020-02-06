import React, { useState } from "react";

import PlayerSearchResults from "./PlayerSearchResults";
import PlayerStats from "./PlayerStats";
import PlayerGameLogs from "./PlayerGameLogs";
import SelectedPlayer from "./SelectedPlayer";
import styled from "styled-components";

const PlayerOuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 75%;
`;

const Input = styled.input`
  width: 50%;
`;

const GameLog = styled.h3`
  color: ${props => (!props.log ? `red` : `gray`)};
  margin: 10px;
  border-bottom: ${props => (!props.log ? `2px solid red` : "none")};
  padding: 10px;

  :hover {
    cursor: pointer;
  }
`;

const SeasonAverage = styled.h3`
  color: ${props => (!props.average ? `red` : `gray`)};
  margin: 10px;
  border-bottom: ${props => (!props.average ? `2px solid red` : "none")};
  padding: 10px;

  :hover {
    cursor: pointer;
  }
`;

const StatSwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  margin-bottom: 20px;
  width: 50%;

  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

function PlayerSearch() {
  const [player, setPlayer] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [playerBio, setPlayerBio] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [playerGameLogs, setPlayerGameLogs] = useState([]);
  const [isGameLog, setIsGameLog] = useState(false);
  const [isSeasonAverage, setIsSeasonAverage] = useState(true);

  const handlePlayerClick = value => {
    setPlayer([]);
    setPlayerBio([value]);
    fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${value.id}`
    )
      .then(response => response.json())
      .then(data => {
        setPlayerStats(data.data);
      });
    fetch(
      `https://www.balldontlie.io/api/v1/stats?seasons[]=2019&player_ids[]=${value.id}&per_page=100`
    )
      .then(response => response.json())
      .then(data => {
        setPlayerGameLogs(data.data);
      });
  };

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    setPlayer([]);
    setPlayerBio([]);
    setPlayerStats([]);
    setPlayerGameLogs([]);

    if (input.length > 2) {
      fetch(
        `https://www.balldontlie.io/api/v1/players?search=${input}&per_page=100`
      )
        .then(response => response.json())
        .then(data => {
          setLoading(true);

          const currentPage = data.meta.current_page;
          const totalPages = data.meta.total_pages;
          for (let i = currentPage; i <= totalPages; i++) {
            fetch(
              `https://www.balldontlie.io/api/v1/players?search=${input}&per_page=100&page=` +
                i
            )
              .then(response => response.json())
              .then(data => {
                setPlayer(player => player.concat(data.data));
                setLoading(false);
              });
          }
        });
    }
  };
  const toggleSeasonAverage = () => {
    if (!isGameLog) {
      setIsGameLog(prevState => !prevState);
      setIsSeasonAverage(prevState => !prevState);
    }
  };

  const toggleGameLog = () => {
    if (!isSeasonAverage) {
      setIsGameLog(prevState => !prevState);
      setIsSeasonAverage(prevState => !prevState);
    }
  };

  const searchedPlayers = loading ? (
    <p> LOADING </p>
  ) : (
    player.map((players, id) => (
      <PlayerSearchResults
        key={id}
        onClick={() => {
          handlePlayerClick(players);
        }}
        players={players}
      />
    ))
  );

  const chosenPlayer = playerBio.map((player, id) => (
    <SelectedPlayer key={id} player={player} />
  ));

  const seasonAverages =
    playerBio.length !== 0 ? <PlayerStats seasonStats={playerStats} /> : null;

  const gameLogs =
    playerBio.length !== 0 ? <PlayerGameLogs logs={playerGameLogs} /> : null;

  const logsOrAverages = isGameLog ? seasonAverages : gameLogs;

  const statSwitch =
    playerBio.length !== 0 ? (
      <StatSwitchContainer>
        <GameLog log={isGameLog} onClick={toggleGameLog}>
          Game Logs
        </GameLog>
        <SeasonAverage average={isSeasonAverage} onClick={toggleSeasonAverage}>
          Season Averages
        </SeasonAverage>
      </StatSwitchContainer>
    ) : null;

  return (
    <div>
      <FormContainer>
        <Form onSubmit={handleSearch}>
          <Input
            type="text"
            name="input"
            value={input}
            onChange={handleChange}
          ></Input>
          <button>Search</button>
        </Form>
      </FormContainer>

      <PlayerOuterContainer>{searchedPlayers}</PlayerOuterContainer>
      {chosenPlayer}
      {statSwitch}
      <div>{logsOrAverages}</div>
    </div>
  );
}

export default PlayerSearch;
