import React from "react";

import styled from "styled-components";

const FormContainer = styled.div`
  text-align: center;
`;

const Form = styled.form``;

const DateOption = styled.option`
  background-color: #fffaf0;
  color: #333;
`;

const DateSelect = styled.select`
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

function GameForm(props) {
  return (
    <FormContainer>
      <Form>
        <DateSelect
          name="yearList"
          value={props.yearOfGame}
          onChange={props.handleYearChange}
        >
          {props.yearOfGame === null ? <option selected>Year</option> : null}
          {props.yearList.map(({ value, yearOfGame }) => (
            <DateOption value={value}>{yearOfGame}</DateOption>
          ))}
        </DateSelect>

        <DateSelect
          name="monthList"
          value={props.monthOfGame}
          onChange={props.handleMonthChange}
        >
          {props.monthOfGame === null ? <option selected>Month</option> : null}
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
            {props.dayOfGame === null ? <option selected>Day</option> : null}
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
