import React, { useState } from "react";

import PlayerSearchResults from "./PlayerSearchResults";
import PlayerStats from "./PlayerStats";
import PlayerGameLogs from "./PlayerGameLogs";
import SelectedPlayer from "./SelectedPlayer";
import PlayerSearchForm from "./PlayerSearchForm";
import styled from "styled-components";

const PlayerOuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1.6rem;
  transition: opacity 1s;
  opacity: ${props => (props.isVisible ? "1" : "0")};
`;

const GameLog = styled.h3`
  color: ${props => (!props.log ? `red` : `gray`)};
  border-bottom: ${props => (!props.log ? `0.2rem solid red` : "none")};
  margin: 0rem 1rem;
  padding: 0rem 0.5rem 0.7rem 0.5rem;

  :hover {
    cursor: pointer;
  }
`;

const SeasonAverage = styled(GameLog)`
  color: ${props => (!props.average ? `red` : `gray`)};
  border-bottom: ${props => (!props.average ? `0.2rem solid red` : "none")};

  :hover {
    cursor: pointer;
  }
`;

const StatSwitchContainer = styled.div`
  display: flex;
  font-size: 1.35rem;
  justify-content: center;
  margin: auto;
  margin-bottom: 3rem;
  width: 90%;

  @media screen and (min-width: 500px) {
    width: 50%;
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
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [noPlayerMessage, setNoPlayerMessage] = useState("");

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

  const slideUp = () => {
    setIsClicked(true);
  };

  const handleChange = event => {
    let validatedValue = event.target.value.replace(/[^A-z ]/gi, "");
    setInput(validatedValue);
    resetIsVisible();
  };

  const handleSearch = event => {
    event.preventDefault();
    resetNoPlayerMessage();
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
          if (totalPages === 0) {
            return setNoPlayerMessage(
              `No players found with the name '${input}'`
            );
          }
          for (let i = currentPage; i <= totalPages; i++) {
            fetch(
              `https://www.balldontlie.io/api/v1/players?search=${input}&per_page=100&page=` +
                i
            )
              .then(response => response.json())
              .then(data => {
                slideUp();
                setPlayer(player => player.concat(data.data));
                setLoading(false);
                fadePlayers();
              });
          }
        });
    }
  };

  const fadePlayers = () => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  };

  const resetNoPlayerMessage = () => {
    setNoPlayerMessage("");
  };

  const resetIsVisible = () => {
    setIsVisible(false);
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

  const Form = (
    <PlayerSearchForm
      handleSearch={handleSearch}
      isClicked={isClicked}
      handleChange={handleChange}
      input={input}
      noPlayerMessage={noPlayerMessage}
    />
  );

  return (
    <div>
      {Form}
      <PlayerOuterContainer isVisible={isVisible}>
        {searchedPlayers}
      </PlayerOuterContainer>
      {chosenPlayer}
      {statSwitch}
      <div>{logsOrAverages}</div>
    </div>
  );
}

export default PlayerSearch;
