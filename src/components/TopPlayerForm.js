import React from "react";

import styled from "styled-components";

const StatisticSelect = styled.select`
  background-color: #fffaf0;
  border: none;
  border: 0.1rem solid #333;
  color: #333;
  font-size: 1.1rem;
  margin: 0.4rem;
  transition: all 0.5s;

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

const DateOption = styled(StatisticOption)``;

const DateSelect = styled(StatisticSelect)``;

const FormsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

function TopPlayerForm(props) {
  return (
    <FormsContainer>
      <form>
        <DateSelect
          name="yearList"
          value={props.year}
          onChange={props.handleYearChange}
        >
          {props.year === null ? <option selected>Year</option> : null}
          {props.yearList.map(({ value, year }) => (
            <DateOption value={value}>{year}</DateOption>
          ))}
        </DateSelect>

        <DateSelect
          name="monthList"
          value={props.month}
          onChange={props.handleMonthChange}
        >
          {props.month === null ? <option selected>Month</option> : null}
          {props.monthList.map(({ value, month }) => (
            <DateOption value={value}>{month}</DateOption>
          ))}
        </DateSelect>

        <label>
          <DateSelect
            name="dayList"
            value={props.day}
            onChange={props.handleDayChange}
          >
            {props.day === null ? <option selected>Day</option> : null}
            {props.dayList.map(({ value, day }) => (
              <DateOption value={value}>{day}</DateOption>
            ))}
          </DateSelect>
        </label>

        <button onClick={props.handleSearch}>Search</button>
      </form>
      <form>
        <label>Sort top players by:</label>
        <StatisticSelect
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
    </FormsContainer>
  );
}

export default TopPlayerForm;
