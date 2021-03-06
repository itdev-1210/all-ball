import React from "react";

import downArrow from "../assets/downArrow.png";
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
  background: url(${downArrow}) no-repeat;
  background-color: #fffaf0;
  background-position: right;
  background-size: 2.7rem 1.7rem;
  border: 0.1rem solid #333;
  border-radius: 1rem;
  color: #333;
  font-size: 1.7rem;
  margin: 2.4rem 0.8rem 0.2rem 0.8rem;
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

const SearchButton = styled.button`
  background-color: #333;
  border: 0.1rem solid #333
  border-radius: 1rem;
  color: #fffaf0;
  font-size: 1.7rem;
  margin: 0.4rem;
  padding: 1rem 2rem 1rem 2rem;
  transition: background-color 0.5s;

  :hover {
    cursor: pointer;
    background-color: #f5cc30;
  }
  
  @media (hover: none) {
    background-color: #333 !important;
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
