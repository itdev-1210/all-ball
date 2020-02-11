import React, { useState, useEffect } from "react";

import PlayerCard from "./PlayerCard";
import TopPlayerForm from "./TopPlayerForm";
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
  const [playerHeader, setPlayerHeader] = useState("");

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

  const getGameMessage = () => {
    const date = new Date();
    const tzOffset = date.getTimezoneOffset() * 350111; // offset in milliseconds
    const yesterday = new Date(Date.now() - 1 - tzOffset)
      .toISOString()
      .split("T")[0];
    const today = date.toISOString().split("T")[0];
    const addZeroToMonth = month < 10 ? `${`0${month}`}` : `${month}`;
    const addZeroToDay = day < 10 ? `${`0${day}`}` : `${day}`;
    const selectedDate = `${year}-${addZeroToMonth}-${addZeroToDay}`;
    let topPlayerDateMessage;

    if (!`${year}` || !`${month}` || !`${day}`) {
      topPlayerDateMessage = "";
    } else if (selectedDate < today) {
      topPlayerDateMessage = `Top Players from ${selectedDate}`;
    } else {
      topPlayerDateMessage = "";
    }
    setPlayerHeader(topPlayerDateMessage);
  };

  const handleSearch = event => {
    getGameMessage();
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

  const yearList = [];
  for (let i = 2020; i > 1984; i--) {
    yearList.push({ year: i });
  }

  const monthList = [];
  for (let x = 12; x > 0; x--) {
    monthList.push({ month: x });
  }

  const dayList = [];
  for (let y = 31; y > 0; y--) {
    dayList.push({ day: y });
  }

  const topPlayerForm = (
    <TopPlayerForm
      yearList={yearList}
      monthList={monthList}
      dayList={dayList}
      statistic={statistic}
      handleStatisticChange={handleStatisticChange}
      handleSearch={handleSearch}
      year={year}
      month={month}
      day={day}
      handleDayChange={handleDayChange}
      handleMonthChange={handleMonthChange}
      handleYearChange={handleYearChange}
    />
  );

  return (
    <div>
      <div>
        {topPlayerForm}
        <h1>{playerHeader}</h1>
      </div>

      <OuterContainer>{highestPoints}</OuterContainer>
    </div>
  );
}

export default TopPlayers;
