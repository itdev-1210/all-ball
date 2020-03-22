import React, { useState, useEffect } from "react";

import PlayerCard from "./PlayerCard";
import TopPlayerForm from "./TopPlayerForm";
import PlayerCardSkeletonLoader from "./PlayerCardSkeletonLoader";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding-left: 11rem;
  padding-right: 11rem;

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

const PlayerCardHeader = styled.h1`
  text-align: center;
`;

function TopPlayers(props) {
  const [players, setPlayers] = useState([]);
  const [statistic, setStatistic] = useState(
    sessionStorage.getItem("statistic") || "points"
  );
  const [year, setYear] = useState(sessionStorage.getItem("year"));
  const [month, setMonth] = useState(sessionStorage.getItem("month"));
  const [day, setDay] = useState(sessionStorage.getItem("day"));
  const [playerHeader, setPlayerHeader] = useState("");
  const [noPlayerMessage, setNoPlayerMessage] = useState("");
  const [searchWarning, setSearchWarning] = useState("");
  const [areStatsAvailable, setAreStatsAvailable] = useState(
    sessionStorage.getItem("areStatsAvailable")
  );
  const [isLoading, setIsLoading] = useState(false);

  const getMostRecentTopPlayers = () => {
    if (sessionStorage.getItem("noDateExistsForPlayers") !== null) {
      setSearchWarning("");
      return sessionStorage.getItem("noDateExistsForPlayers");
    }
    setNoPlayerMessage("");
    const tzOffset = new Date().getTimezoneOffset() * 450111; //offset in milliseconds
    const yesterday = new Date(Date.now() - 1 - tzOffset)
      .toISOString()
      .split("T")[0];
    fetch(
      `https://www.balldontlie.io/api/v1/stats?dates[]=${yesterday}&per_page=100`
    )
      .then(response => response.json())
      .then(data => {
        const currentPage = data.meta.current_page;
        const totalPages = data.meta.total_pages;
        if (
          year === "null" ||
          typeof year === "object" ||
          month === "null" ||
          typeof month === "object" ||
          day === "null" ||
          typeof day === "object"
        ) {
          if (totalPages === 0) {
            setPlayerHeader("Search for the best players by date");
          } else {
            for (let i = currentPage; i <= totalPages; i++) {
              setIsLoading(true);
              fetch(
                `https://www.balldontlie.io/api/v1/stats?dates[]=${yesterday}&per_page=100&page=` +
                  i
              )
                .then(response => response.json())
                .then(data => {
                  setPlayers(players => players.concat(data.data));
                  setIsLoading(false);
                  setPlayerHeader("Top players from yesterday");
                })
                .catch(error => {
                  if (error) {
                    redirectError();
                  }
                });
            }
          }
        } else {
          for (let i = currentPage; i <= 5; i++) {
            areStatsAvailable === "true" && setIsLoading(true);
            fetch(
              `https://www.balldontlie.io/api/v1/stats?dates[]=${year}-${month}-${day}&per_page=100&page=` +
                i
            )
              .then(response => response.json())
              .then(data => {
                setPlayers(players => players.concat(data.data));
                setIsLoading(false);
                areStatsAvailable === "true" ||
                sessionStorage.getItem("noDateExistsForPlayers") !== null
                  ? setPlayerHeader(`Top players from ${year}-${month}-${day}`)
                  : setNoPlayerMessage(
                      "No stats available for games that have not been played"
                    );
              })
              .catch(error => {
                if (error) {
                  redirectError();
                }
              });
          }
        }
      })
      .catch(error => {
        if (error) {
          redirectError();
        }
      });
  };

  const getDaysInMonth = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    if (daysInMonth < day) {
      sessionStorage.setItem(
        "noDateExistsForPlayers",
        "This date does not exist"
      );
    } else {
      sessionStorage.removeItem("noDateExistsForPlayers");
    }
  };

  useEffect(() => {
    getMostRecentTopPlayers();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("year", year);
  }, [year]);

  useEffect(() => {
    sessionStorage.setItem("month", month);
  }, [month]);

  useEffect(() => {
    sessionStorage.setItem("day", day);
  }, [day]);

  useEffect(() => {
    sessionStorage.setItem("statistic", statistic);
  }, [statistic]);

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

  const getPlayerMessage = () => {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const addZeroToMonth = month < 10 ? `${`0${month}`}` : `${month}`;
    const addZeroToDay = day < 10 ? `${`0${day}`}` : `${day}`;
    const selectedDate = `${year}-${addZeroToMonth}-${addZeroToDay}`;
    let topPlayerDateMessage;

    if (sessionStorage.getItem("noDateExistsForPlayers") !== null) {
      topPlayerDateMessage = "";
    } else if (
      year === "null" ||
      typeof year === "object" ||
      month === "null" ||
      typeof month === "object" ||
      day === "null" ||
      typeof day === "object"
    ) {
      topPlayerDateMessage = "";
    } else if (selectedDate < today) {
      topPlayerDateMessage = `Top players from ${selectedDate}`;
    }
    setPlayerHeader(topPlayerDateMessage);
  };

  const handleSearch = event => {
    getDaysInMonth();
    players.length = 0;
    setNoPlayerMessage("");
    getPlayerMessage();
    event.preventDefault();
    if (
      year === "null" ||
      typeof year === "object" ||
      month === "null" ||
      typeof month === "object" ||
      day === "null" ||
      typeof day === "object"
    ) {
      return setSearchWarning("Cannot search without a year, month and day");
    }
    if (sessionStorage.getItem("noDateExistsForPlayers") !== null) {
      setSearchWarning("");
      return sessionStorage.getItem("noDateExistsForPlayers");
    }
    if (`${year}` && `${month}` && `${day}`) {
      setIsLoading(true);
      setSearchWarning("");
      fetch(
        `https://www.balldontlie.io/api/v1/stats?dates[]=${year}-${month}-${day}&per_page=100`
      )
        .then(response => response.json())
        .then(data => {
          const currentPage = data.meta.current_page;
          const totalPages = data.meta.total_pages;
          if (totalPages > 0) {
            for (let i = currentPage; i <= totalPages; i++) {
              fetch(
                `https://www.balldontlie.io/api/v1/stats?dates[]=${year}-${month}-${day}&per_page=100&page=` +
                  i
              )
                .then(response => response.json())
                .then(data => {
                  setPlayers(players => players.concat(data.data));
                  setIsLoading(false);
                  sessionStorage.setItem("areStatsAvailable", true);
                })
                .catch(error => {
                  if (error) {
                    redirectError();
                  }
                });
            }
          } else {
            setIsLoading(false);
            sessionStorage.setItem("areStatsAvailable", false);
            setNoPlayerMessage(
              "No stats available for games that have not been played"
            );
          }
        })
        .catch(error => {
          if (error) {
            redirectError();
          }
        });
    }
  };

  const redirectError = () => {
    props.history.push({
      pathname: "/error"
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
      searchWarning={searchWarning}
    />
  );

  const playerSectionMessage = !noPlayerMessage
    ? playerHeader
    : noPlayerMessage;

  return (
    <div>
      <div>
        {topPlayerForm}
        <PlayerCardHeader>
          {!isLoading && playerSectionMessage}
        </PlayerCardHeader>
      </div>
      <OuterContainer>
        {isLoading ? <PlayerCardSkeletonLoader /> : highestPoints}
      </OuterContainer>
    </div>
  );
}

export default TopPlayers;
