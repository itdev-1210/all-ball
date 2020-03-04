import React from "react";

import styled from "styled-components";

const FormContainer = styled.div`
  text-align: center;
`;

const Form = styled.form``;

const SearchWarning = styled.p`
  color: red;
  display: ${props => props.warning.length === 0 && "none"};
  margin-top: -2.2rem;
`;

const DateOption = styled.option`
  background-color: #fffaf0;
  color: #333;
`;

const DateSelect = styled.select`
  background-color: #fffaf0;
  border: none;
  border: 0.1rem solid #333;
  color: #333;
  font-size: 16px;
  margin: 0.4rem;
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

function GameForm(props) {
  return (
    <FormContainer>
      <Form>
      <p>{sessionStorage.getItem("noDateExistsForGames")}</p>
        <SearchWarning warning={props.searchWarning}>
          {props.searchWarning}
        </SearchWarning>
        <label>Search games by:</label>
        <DateSelect
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

        <button onClick={props.handleSearch}>Search</button>
      </Form>
    </FormContainer>
  );
}

export default GameForm;
