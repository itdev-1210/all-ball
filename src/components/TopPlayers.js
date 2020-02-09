import React, { useState, useEffect } from "react";

import PlayerCard from "./PlayerCard";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  padding-left: 11rem;
  padding-right: 11rem;
  flex-wrap: wrap;
  flex-direction: column;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    padding-left: 1.8rem;
    padding-right: 1.8rem;
  }

  @media screen and (min-width: 1300px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

function TopPlayers() {
  const [players, setPlayers] = useState([]);
  const [statistic, setStatistic] = useState("points");
  const [year, setYear] = useState([]);
  const [month, setMonth] = useState([]);
  const [day, setDay] = useState([]);

  const getMostRecentTopPlayers = () => {
    const tzOffset = new Date().getTimezoneOffset() * 350111; //offset in milliseconds
    const yesterday = new Date(Date.now() - 1 - tzOffset)
      .toISOString()
      .split("T")[0];
    const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2))
      .toISOString()
      .split("T")[0];
    fetch(
      `https://www.balldontlie.io/api/v1/stats?dates[]=${yesterday}&per_page=100`
    )
      .then(response => response.json())
      .then(data => {
        const currentPage = data.meta.current_page;
        const totalPages = data.meta.total_pages;
        if (totalPages === 0) {
          for (let i = currentPage; i <= 4; i++) {
            fetch(
              `https://www.balldontlie.io/api/v1/stats?dates[]=${twoDaysAgo}&per_page=100&page=` +
                i
            )
              .then(response => response.json())
              .then(data => {
                setPlayers(players => players.concat(data.data));
              });
          }
        } else {
          for (let i = currentPage; i <= totalPages; i++) {
            fetch(
              `https://www.balldontlie.io/api/v1/stats?dates[]=${yesterday}&per_page=100&page=` +
                i
            )
              .then(response => response.json())
              .then(data => {
                setPlayers(players => players.concat(data.data));
              });
          }
        }
      });
  };

  useEffect(() => {
    getMostRecentTopPlayers();
  }, []);

  const handleDayChange = event => {
    setDay(event.target.value);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleStatisticChange = event => {
    setStatistic(event.target.value);
  };

  const handleClick = event => {
    event.preventDefault();
    fetch(
      `https://www.balldontlie.io/api/v1/stats?dates[]=${year}-${month}-${day}&per_page=100`
    )
      .then(response => response.json())
      .then(data => {
        const currentPage = data.meta.current_page;
        const totalPages = data.meta.total_pages;
        for (let i = currentPage; i <= totalPages; i++) {
          fetch(
            `https://www.balldontlie.io/api/v1/stats?dates[]=${year}-${month}-${day}&per_page=100&page=` +
              i
          )
            .then(response => response.json())
            .then(data => {
              setPlayers(data.data);
            });
        }
      });
  };

  let highestPoints;

  if (statistic === "assists") {
    highestPoints = []
      .concat(players)
      .sort((a, b) => b.ast - a.ast)
      .splice(0, 5)
      .map((playerData, i) => <PlayerCard key={i} playerData={playerData} />);
  } else if (statistic === "points") {
    highestPoints = []
      .concat(players)
      .sort((a, b) => b.pts - a.pts)
      .splice(0, 5)
      .map((playerData, i) => <PlayerCard key={i} playerData={playerData} />);
  } else if (statistic === "rebounds") {
    highestPoints = []
      .concat(players)
      .sort((a, b) => b.reb - a.reb)
      .splice(0, 5)
      .map((playerData, i) => <PlayerCard key={i} playerData={playerData} />);
  } else if (statistic === "steals") {
    highestPoints = []
      .concat(players)
      .sort((a, b) => b.stl - a.stl)
      .splice(0, 5)
      .map((playerData, i) => <PlayerCard key={i} playerData={playerData} />);
  } else if (statistic === "blocks") {
    highestPoints = []
      .concat(players)
      .sort((a, b) => b.blk - a.blk)
      .splice(0, 5)
      .map((playerData, i) => <PlayerCard key={i} playerData={playerData} />);
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
        <h1>Top players from {`${year}-${month}-${day}`}</h1>

        <form>
          <label>
            Sort players by:
            <select
              name="statistic"
              value={statistic}
              onChange={handleStatisticChange}
            >
              <option value="points">Points</option>
              <option value="assists">Assists</option>
              <option value="rebounds">Rebounds</option>
              <option value="steals">Steals</option>
              <option value="blocks">Blocks</option>
            </select>
          </label>

          <label>
            Year:
            <select name="yearList" value={year} onChange={handleYearChange}>
              {years.map(({ value, year }) => (
                <option value={value}>{year}</option>
              ))}
            </select>
          </label>

          <label>
            Month:
            <select name="monthList" value={month} onChange={handleMonthChange}>
              {months.map(({ value, month }) => (
                <option value={value}>{month}</option>
              ))}
            </select>
          </label>

          <label>
            Day:
            <select name="dayList" value={day} onChange={handleDayChange}>
              {days.map(({ value, day }) => (
                <option value={value}>{day}</option>
              ))}
            </select>
          </label>

          <button onClick={handleClick}>Search</button>
        </form>
      </div>

      <OuterContainer>{highestPoints}</OuterContainer>
    </div>
  );
}

export default TopPlayers;
