import React from "react";

import downArrow from "../assets/downArrow.png";
import styled from "styled-components";

const FormsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 4rem;
  text-align: center;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }

  @media screen and (min-width: 1100px) {
    margin-top: 1rem;
  }

  @media screen and (min-width: 1400px) {
    margin-top: 5rem;
  }
`;

const StatisticSelect = styled.select`
  background: url(${downArrow}) no-repeat;
  background-color: #fffaf0;
  background-position: right;
  background-size: 2.7rem 1.7rem;
  border: 0.1rem solid #333;
  border-radius: 1rem;
  color: #333;
  font-size: 1.7rem;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;
  padding: 1rem 4rem 1rem 1rem;
  transition: background-color 0.5s;
  -moz-appearance: none;
  -webkit-appearance: none;

  :hover {
    cursor: pointer;
    background-color: #e6e1d8;
  }

  @media (hover: none) {
    font-size: 16px;
    margin-left: 0rem;
    margin-right: 0rem;
    transform-origin: top left;
    transform: scale(0.8);
  }
`;

const StatisticOption = styled.option`
  background-color: #fffaf0;
  color: #333;
`;

const DateForm = styled.form`
  margin-top: 2rem;
  position: relative;
`;

const NoDateSelectedWarning = styled.p`
  color: red;
  font-size: 1.2rem;
  margin: auto;
  margin-bottom: 1rem;
  position: absolute;
  top: -2.4rem;
  width: 100%;
`;

const NoDateExistsWarning = styled(NoDateSelectedWarning)``;

const DateOption = styled(StatisticOption)``;

const DateSelect = styled(StatisticSelect)`
  margin: 0.4rem 0.8rem;
`;

const SearchButton = styled.button`
  background-color: #333;
  border: 0.1rem solid #333
  color: #fffaf0;
  font-size: 1.7rem;
  margin: 0.4rem;
  padding-right: 1rem;
  padding-left: 1rem;
  transition: background-color 0.5s;

  :hover {
    cursor: pointer;
    background-color: #5a5a5a;
  }

  @media (hover: none) {
    background-color: #333 !important;
    font-size: 16px;
    transition: all 0.5s;
    transform-origin: top left;
    transform: scale(0.8);
  }
`;

function TopPlayerForm(props) {
  const noDateExists = sessionStorage.getItem("noDateExistsForPlayers");
  const noDateSelected = props.searchWarning;

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
        <NoDateExistsWarning noDateExists={noDateExists}>
          {noDateExists}
        </NoDateExistsWarning>
        <NoDateSelectedWarning noDateSelected={noDateSelected}>
          {noDateSelected}
        </NoDateSelectedWarning>
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
