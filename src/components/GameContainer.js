import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import styled from "styled-components";
import GameCard from "./GameCard";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  overflow: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    margin: 0 50px;
  }

  &::-webkit-scrollbar {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }

  @media screen and (max-width: 1440px) {
    justify-content: normal;
  }
`;

const FlexScroll = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  padding: 17px 20px;
`;

function GameContainer(props) {
  const [games, setGames] = useState([]);
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([]);
  const [day, setDay] = useState([]);
  const [gameCardHeader, setGameCardHeader] = useState("");
  const [noGameMessage, setNoGameMessage] = useState("");

  const tzOffset = new Date().getTimezoneOffset() * 350111; // offset in milliseconds
  const yesterday = new Date(Date.now() - 1 - tzOffset)
    .toISOString()
    .split("T")[0];

  const getMostRecentGames = () => {
    const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2))
      .toISOString()
      .split("T")[0];
    fetch(
      `https://www.balldontlie.io/api/v1/games/?start_date=[]${yesterday}&end_date=[]${yesterday}`
    )
      .then(response => response.json())
      .then(data => {
        const totalPages = data.meta.total_pages;
        if (totalPages === 0) {
          fetch(
            `https://www.balldontlie.io/api/v1/games/?start_date=[]${twoDaysAgo}&end_date=[]${twoDaysAgo}&per_page=100`
          )
            .then(response => response.json())
            .then(data => {
              setGames(data.data);
            });
        } else {
          fetch(
            `https://www.balldontlie.io/api/v1/games/?start_date=[]${yesterday}&end_date=[]${yesterday}&per_page=100`
          )
            .then(response => response.json())
            .then(data => {
              setGames(data.data);
            });
        }
      });
  };

  useEffect(() => {
    getMostRecentGames();
  }, []);

  const getGameMessage = () => {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const addZeroToMonth = month < 10 ? `${`0${month}`}` : `${month}`;
    const addZeroToDay = month < 10 ? `${`0${day}`}` : `${day}`;
    const selectedDate = `${year}-${addZeroToMonth}-${addZeroToDay}`;
    let gameDayMessage;

    if (!`${year}` || !`${month}` || !`${day}`) {
      gameDayMessage = "";
    } else if (selectedDate > today) {
      gameDayMessage = `Games scheduled on ${selectedDate}`;
    } else if (selectedDate == yesterday) {
      gameDayMessage = `Game results from ${yesterday}`;
    } else if (selectedDate == today) {
      gameDayMessage = `Games scheduled for ${today}`;
    } else if (selectedDate < today) {
      gameDayMessage = `Game results from ${selectedDate}`;
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

  const handleSearchClick = event => {
    setNoGameMessage("");
    getGameMessage();
    event.preventDefault();
    if (`${year}` && `${month}` && `${day}`) {
      fetch(
        `https://www.balldontlie.io/api/v1/games/?start_date=[]${year}-${month}-${day}&end_date=[]${year}-${month}-${day}&per_page=100`
      )
        .then(response => response.json())
        .then(data => {
          const currentPage = data.meta.current_page;
          const totalPages = data.meta.total_pages;
          if (totalPages > 0) {
            for (let i = currentPage; i <= totalPages; i++) {
              fetch(
                `https://www.balldontlie.io/api/v1/games/?start_date=[]${year}-${month}-${day}&end_date=[]${year}-${month}-${day}&per_page=100&page=${i}`
              ).then(response => response.json());
              setGames(data.data);
            }
          } else {
            setNoGameMessage("No games scheduled. Try a different date!");
          }
        });
    }
  };

  const handleDayChange = event => {
    setDay(event.target.value);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
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

  const years = [];
  for (let i = 2020; i > 1984; i--) {
    years.push({ year: i });
  }

  const months = [];
  for (let x = 12; x > 0; x--) {
    months.push({ month: x });
  }

  const days = [];
  for (let y = 31; y > 0; y--) {
    days.push({ day: y });
  }

  return (
    <div>
      <div>
        <form>
          <label>
            Year:
            <select name="yearList" value={year} onChange={handleYearChange}>
              <option value="" disabled select hidden>
                -
              </option>
              {years.map(({ value, year }) => (
                <option value={value}>{year}</option>
              ))}
            </select>
          </label>

          <label>
            Month:
            <select name="monthList" value={month} onChange={handleMonthChange}>
              <option value="" disabled select hidden>
                -
              </option>
              {months.map(({ value, month }) => (
                <option value={value}>{month}</option>
              ))}
            </select>
          </label>

          <label>
            Day:
            <select name="dayList" value={day} onChange={handleDayChange}>
              <option value="" disabled select hidden>
                -
              </option>
              {days.map(({ value, day }) => (
                <option value={value}>{day}</option>
              ))}
            </select>
          </label>
          <button onClick={handleSearchClick}>Search</button>
          <h1> {!noGameMessage ? gameCardHeader : noGameMessage} </h1>
        </form>
      </div>

      <Container>
        <FlexScroll>{gameResults}</FlexScroll>
      </Container>
    </div>
  );
}

export default withRouter(GameContainer);
