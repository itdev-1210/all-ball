import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import styled from "styled-components";
import GameCard from "./GameCard";
import GameForm from "./GameForm";
import GameCardSkeletonLoader from "./GameCardSkeletonLoader";

const Container = styled.div`
  display: flex;
  margin: auto;
  overflow: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0.6rem rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    background-color: #f5f5f5;
    margin: 0 5rem;
  }

  &::-webkit-scrollbar {
    background-color: #fffaf0;
    height: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 0.6rem rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  @media screen and (min-width: 100px) {
    justify-content: ${props => (props.games.length > 3 ? `normal` : "center")};
  }

  @media screen and (min-width: 345px) {
    justify-content: ${props =>
      props.games.length <= 4 ? `normal` : "center"};
  }

  @media screen and (min-width: 360px) {
    justify-content: ${props => (props.games.length > 4 ? `normal` : "center")};
  }

  @media screen and (min-width: 600px) {
    justify-content: ${props => (props.games.length > 5 ? `normal` : "center")};
  }

  @media screen and (min-width: 700px) {
    justify-content: ${props => (props.games.length > 6 ? `normal` : "center")};
  }

  @media screen and (min-width: 1000px) {
    justify-content: ${props =>
      props.games.length >= 9 ? `normal` : "center"};
  }

  @media screen and (min-width: 1400px) {
    justify-content: ${props =>
      props.games.length >= 13 ? `normal` : "center"};
  }

  @media screen and (min-width: 1800px) {
    justify-content: ${props =>
      props.games.length > 12 ? `normal` : "center"};
  }

  @media screen and (min-width: 2230px) {
    justify-content: center;
  }
`;

const FlexScroll = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  padding: 0rem 2rem 1.7rem 2rem;
`;

const GameHeader = styled.h1`
  text-align: center;
  margin: 3rem auto;
`;

function GameContainer(props) {
  const [games, setGames] = useState([]);
  const [yearOfGame, setYearOfGame] = useState(
    sessionStorage.getItem("yearOfGame")
  );
  const [monthOfGame, setMonthOfGame] = useState(
    sessionStorage.getItem("monthOfGame")
  );
  const [dayOfGame, setDayOfGame] = useState(
    sessionStorage.getItem("dayOfGame")
  );
  const [gameCardHeader, setGameCardHeader] = useState("");
  const [noGameMessage, setNoGameMessage] = useState("");
  const [searchWarning, setSearchWarning] = useState("");
  const [areGamesAvailable, setAreGamesAvailable] = useState(
    sessionStorage.getItem("areGamesAvailable")
  );
  const [isLoading, setIsLoading] = useState(false);

  const tzOffset = new Date().getTimezoneOffset() * 450111; // offset in milliseconds
  const yesterday = new Date(Date.now() - 1 - tzOffset)
    .toISOString()
    .split("T")[0];

  const getMostRecentGames = () => {
    if (sessionStorage.getItem("noDateExistsForGames") !== null) {
      setSearchWarning("");
      return sessionStorage.getItem("noDateExistsForGames");
    }
    const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2))
      .toISOString()
      .split("T")[0];
    fetch(
      `https://www.balldontlie.io/api/v1/games/?start_date=[]${yesterday}&end_date=[]${yesterday}`
    )
      .then(response => response.json())
      .then(data => {
        const totalPages = data.meta.total_pages;
        if (
          yearOfGame === "null" ||
          typeof yearOfGame === "object" ||
          monthOfGame === "null" ||
          typeof monthOfGame === "object" ||
          dayOfGame === "null" ||
          typeof dayOfGame === "object"
        ) {
          if (totalPages === 0) {
            setIsLoading(true);
            fetch(
              `https://www.balldontlie.io/api/v1/games/?start_date=[]${twoDaysAgo}&end_date=[]${twoDaysAgo}&per_page=100`
            )
              .then(response => response.json())
              .then(data => {
                setGames(data.data);
                setIsLoading(false);
                setGameCardHeader(
                  `Game results from ${yearOfGame}-${monthOfGame}-${dayOfGame}`
                );
              });
          } else {
            setIsLoading(true);
            fetch(
              `https://www.balldontlie.io/api/v1/games/?start_date=[]${yesterday}&end_date=[]${yesterday}&per_page=100`
            )
              .then(response => response.json())
              .then(data => {
                setGames(data.data);
                setIsLoading(false);
                setGameCardHeader("Game results from yesterday");
              });
          }
        } else {
          areGamesAvailable === "true" && setIsLoading(true);
          fetch(
            `https://www.balldontlie.io/api/v1/games/?start_date=[]${yearOfGame}-${monthOfGame}-${dayOfGame}&end_date=[]${yearOfGame}-${monthOfGame}-${dayOfGame}&per_page=100`
          )
            .then(response => response.json())
            .then(data => {
              setGames(data.data);
              setIsLoading(false);
              areGamesAvailable === "true" ||
              sessionStorage.getItem("noDateExistsForGames") !== null
                ? setGameCardHeader(
                    `Game results from ${yearOfGame}-${monthOfGame}-${dayOfGame}`
                  )
                : setNoGameMessage("No games scheduled for this date");
            });
        }
      });
  };

  const getDaysInMonth = () => {
    const daysInMonth = new Date(yearOfGame, monthOfGame, 0).getDate();
    if (daysInMonth < dayOfGame) {
      sessionStorage.setItem(
        "noDateExistsForGames",
        "This date does not exist"
      );
    } else {
      sessionStorage.removeItem("noDateExistsForGames");
    }
  };

  useEffect(() => {
    getMostRecentGames();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("yearOfGame", yearOfGame);
  }, [yearOfGame]);

  useEffect(() => {
    sessionStorage.setItem("monthOfGame", monthOfGame);
  }, [monthOfGame]);

  useEffect(() => {
    sessionStorage.setItem("dayOfGame", dayOfGame);
  }, [dayOfGame]);

  const getGameMessage = () => {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const addZeroToMonth =
      monthOfGame < 10 ? `${`0${monthOfGame}`}` : `${monthOfGame}`;
    const addZeroToDay = dayOfGame < 10 ? `${`0${dayOfGame}`}` : `${dayOfGame}`;
    const selectedDate = `${yearOfGame}-${addZeroToMonth}-${addZeroToDay}`;
    let gameDayMessage;

    if (sessionStorage.getItem("noDateExistsForGames") !== null) {
      gameDayMessage = "";
    } else if (
      yearOfGame === "null" ||
      typeof yearOfGame === "object" ||
      monthOfGame === "null" ||
      typeof monthOfGame === "object" ||
      dayOfGame === "null" ||
      typeof dayOfGame === "object"
    ) {
      gameDayMessage = "Game results from yesterday";
    } else if (selectedDate > today) {
      gameDayMessage = `Games scheduled on ${yearOfGame}-${monthOfGame}-${dayOfGame}`;
    } else if (selectedDate == yesterday) {
      gameDayMessage = `Game results from yesterday`;
    } else if (selectedDate == today) {
      gameDayMessage = `Games scheduled for today`;
    } else if (selectedDate < today) {
      gameDayMessage = `Game results from ${yearOfGame}-${monthOfGame}-${dayOfGame}`;
    }
    setGameCardHeader(gameDayMessage);
  };

  const handleGameClick = value => {
    props.history.push({
      pathname: `/games/${value.id}`,
      state: {
        game: `${value.id}`
      }
    });
  };

  const handleSearch = event => {
    getDaysInMonth();
    setNoGameMessage("");
    getGameMessage();
    event.preventDefault();
    if (
      yearOfGame === "null" ||
      typeof yearOfGame === "object" ||
      monthOfGame === "null" ||
      typeof monthOfGame === "object" ||
      dayOfGame === "null" ||
      typeof dayOfGame === "object"
    ) {
      return setSearchWarning("Cannot search without a year, month and day");
    }
    if (sessionStorage.getItem("noDateExistsForGames") !== null) {
      games.length = 0;
      setSearchWarning("");
      return sessionStorage.getItem("noDateExistsForGames");
    }
    if (`${yearOfGame}` && `${monthOfGame}` && `${dayOfGame}`) {
      setIsLoading(true);
      setSearchWarning("");
      fetch(
        `https://www.balldontlie.io/api/v1/games/?start_date=[]${yearOfGame}-${monthOfGame}-${dayOfGame}&end_date=[]${yearOfGame}-${monthOfGame}-${dayOfGame}&per_page=100`
      )
        .then(response => response.json())
        .then(data => {
          const currentPage = data.meta.current_page;
          const totalPages = data.meta.total_pages;
          if (totalPages > 0) {
            for (let i = currentPage; i <= totalPages; i++) {
              fetch(
                `https://www.balldontlie.io/api/v1/games/?start_date=[]${yearOfGame}-${monthOfGame}-${dayOfGame}&end_date=[]${yearOfGame}-${monthOfGame}-${dayOfGame}&per_page=100&page=${i}`
              ).then(response => response.json());
              setGames(data.data);
              setIsLoading(false);
              sessionStorage.setItem("areGamesAvailable", true);
            }
          } else {
            setIsLoading(false);
            sessionStorage.setItem("areGamesAvailable", false);
            setNoGameMessage("No games scheduled for this date");
          }
        });
    }
  };

  const handleDayChange = event => {
    setDayOfGame(event.target.value);
  };

  const handleMonthChange = event => {
    setMonthOfGame(event.target.value);
  };

  const handleYearChange = event => {
    setYearOfGame(event.target.value);
  };

  let gameResults;

  if (!noGameMessage) {
    gameResults = games.map((gameData, id) => (
      <GameCard
        key={id}
        onClick={() => {
          handleGameClick(gameData);
        }}
        gameData={gameData}
      />
    ));
  } else {
    gameResults = null;
  }

  const yearList = [];
  for (let i = 2020; i > 1984; i--) {
    yearList.push({ yearOfGame: i });
  }

  const monthList = [];
  for (let x = 12; x > 0; x--) {
    monthList.push({ monthOfGame: x });
  }

  const dayList = [];
  for (let y = 31; y > 0; y--) {
    dayList.push({ dayOfGame: y });
  }

  const gameForm = (
    <GameForm
      yearList={yearList}
      monthList={monthList}
      dayList={dayList}
      handleSearch={handleSearch}
      yearOfGame={yearOfGame}
      monthOfGame={monthOfGame}
      dayOfGame={dayOfGame}
      handleDayChange={handleDayChange}
      handleMonthChange={handleMonthChange}
      handleYearChange={handleYearChange}
      searchWarning={searchWarning}
    />
  );

  const gameSectionMessage = !noGameMessage ? gameCardHeader : noGameMessage;

  return (
    <div>
      {gameForm}
      <GameHeader>{!isLoading && gameSectionMessage}</GameHeader>
      <Container games={games}>
        <FlexScroll>
          {isLoading ? <GameCardSkeletonLoader /> : gameResults}
        </FlexScroll>
      </Container>
    </div>
  );
}

export default withRouter(GameContainer);
