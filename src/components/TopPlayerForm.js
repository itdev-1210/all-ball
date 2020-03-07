import React from "react";

import styled from "styled-components";

const FormsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  text-align: center;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const StatisticSelect = styled.select`
  background-color: #fffaf0;
  border: none;
  border: 0.1rem solid #333;
  color: #333;
  font-size: 16px;
  margin: 0.4rem;
  transition: all 0.5s;
  margin-bottom: 1.5rem;
  padding: 2px;
  transition: all 0.5s;
  transform-origin: top left;
  transform: scale(0.8);

  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
    background-color: #e6e1d8;
  }
`;

const StatisticOption = styled.option`
  background-color: #fffaf0;
  color: #333;
`;

const DateForm = styled.form`
  margin-top: 2rem;

  @media screen and (min-width: 600px) {
    margin-top: 0rem;
  }
`;

const SearchWarning = styled.p`
  color: red;
  display: ${props => props.warning.length === 0 && "none"};
  margin-top: -2.2rem;
`;

const DateOption = styled(StatisticOption)``;

const DateSelect = styled(StatisticSelect)``;

const SearchButton = styled.button`
  background-color: #333;
  border: 0.1rem solid #333
  color: #fffaf0;
  font-size: 16px;
  margin: 0.4rem;
  padding: 2px;
  padding-right: 1rem;
  padding-left: 1rem;
  transition: all 0.5s;
  transform-origin: top left;
  transform: scale(0.8);

  :hover {
    cursor: pointer;
    background-color: #5a5a5a;
  }
`;

function TopPlayerForm(props) {
  return (
    <FormsContainer>
      <form aria-label="Sort top players by points, assists, rebounds, steals, and blocks">
        <StatisticSelect
          aria-label="List of points, assists, rebounds, steals, and blocks"
          name="statistic"
          value={props.statistic}
          onChange={props.handleStatisticChange}
        >
          <StatisticOption value="points">Points</StatisticOption>
          <StatisticOption value="assists">Assists</StatisticOption>
          <StatisticOption value="rebounds">Rebounds</StatisticOption>
          <StatisticOption value="steals">Steals</StatisticOption>
          <StatisticOption value="blocks">Blocks</StatisticOption>
        </StatisticSelect>
      </form>
      <DateForm aria-label="Search for top players by date">
        <p>{sessionStorage.getItem("noDateExistsForPlayers")}</p>
        <SearchWarning warning={props.searchWarning}>
          {props.searchWarning}
        </SearchWarning>
        <DateSelect
          aria-label="List of years from 1985 to current year"
          name="yearList"
          value={props.year}
          onChange={props.handleYearChange}
        >
          <option selected hidden>
            Year
          </option>
          {props.yearList.map(({ value, year }) => (
            <DateOption value={value}>{year}</DateOption>
          ))}
        </DateSelect>
        <DateSelect
          aria-label="List of Months represented as 1 to 12"
          name="monthList"
          value={props.month}
          onChange={props.handleMonthChange}
        >
          <option selected hidden>
            Month
          </option>
          {props.monthList.map(({ value, month }) => (
            <DateOption value={value}>{month}</DateOption>
          ))}
        </DateSelect>
        <label>
          <DateSelect
            aria-label="Numbers of Days in a month represented as 1 to 31"
            name="dayList"
            value={props.day}
            onChange={props.handleDayChange}
          >
            <option selected hidden>
              Day
            </option>
            {props.dayList.map(({ value, day }) => (
              <DateOption value={value}>{day}</DateOption>
            ))}
          </DateSelect>
        </label>
        <SearchButton onClick={props.handleSearch}>Search</SearchButton>
      </DateForm>
    </FormsContainer>
  );
}

export default TopPlayerForm;
