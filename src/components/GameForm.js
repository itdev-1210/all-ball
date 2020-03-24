import React from "react";

import styled from "styled-components";

const FormContainer = styled.div`
  text-align: center;
`;

const Form = styled.form`
  position: relative;

  @media screen and (min-width: 1400px) {
    margin-top: 8rem;
  }
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

const DateOption = styled.option`
  background-color: #fffaf0;
  color: #333;
`;

const DateSelect = styled.select`
  background-color: #fffaf0;
  border: none;
  border: 0.1rem solid #333;
  color: #333;
  font-size: 1.7rem
  margin: 0.4rem 0.8rem;
  padding: 2px;
  transition: background-color 0.5s;

  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
    background-color: #e6e1d8;
  }

  @media (hover: none) {
    font-size: 16px;
    margin-left: 0rem;
    margin-right: 0rem;
    transition: all 0.5s;
    transform-origin: top left;
    transform: scale(0.8);
  }
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
    font-size: 16px;
    transition: all 0.5s;
    transform-origin: top left;
    transform: scale(0.8);
  }
  `;

function GameForm(props) {
  const noDateExists = sessionStorage.getItem("noDateExistsForGames");
  const noDateSelected = props.searchWarning;

  return (
    <FormContainer>
      <Form aria-label="Search for game results or upcoming games by date">
        <NoDateExistsWarning noDateExists={noDateExists}>
          {noDateExists}
        </NoDateExistsWarning>
        <NoDateSelectedWarning noDateSelected={noDateSelected}>
          {noDateSelected}
        </NoDateSelectedWarning>
        <DateSelect
          aria-label="List of years from 1985 to current year"
          name="yearList"
          value={props.yearOfGame}
          onChange={props.handleYearChange}
        >
          <option selected hidden>
            Year
          </option>
          {props.yearList.map(({ value, yearOfGame }) => (
            <DateOption value={value}>{yearOfGame}</DateOption>
          ))}
        </DateSelect>

        <DateSelect
          aria-label="List of Months represented as 1 to 12"
          name="monthList"
          value={props.monthOfGame}
          onChange={props.handleMonthChange}
        >
          <option selected hidden>
            Month
          </option>
          {props.monthList.map(({ value, monthOfGame }) => (
            <DateOption value={value}>{monthOfGame}</DateOption>
          ))}
        </DateSelect>

        <label>
          <DateSelect
            aria-label="List of Days in a month represented as 1 to 31"
            name="dayList"
            value={props.dayOfGame}
            onChange={props.handleDayChange}
          >
            <option selected hidden>
              Day
            </option>
            {props.dayList.map(({ value, dayOfGame }) => (
              <DateOption value={value}>{dayOfGame}</DateOption>
            ))}
          </DateSelect>
        </label>

        <SearchButton onClick={props.handleSearch}>Search</SearchButton>
      </Form>
    </FormContainer>
  );
}

export default GameForm;
