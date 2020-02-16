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
      </Form>
    </FormContainer>
  );
}

export default GameForm;
