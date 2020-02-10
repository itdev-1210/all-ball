import React from "react";

function TopPlayersSelectBox(props) {
  return (
    <div>
      <form>
        <label>
          Sort players by:
          <select
            name="statistic"
            value={props.statistic}
            onChange={props.handleStatisticChange}
          >
            <option value="points">Points</option>
            <option value="assists">Assists</option>
            <option value="rebounds">Rebounds</option>
            <option value="steals">Steals</option>
            <option value="blocks">Blocks</option>
          </select>
        </label>

        <label>
          Year:
          <select
            name="yearList"
            value={props.year}
            onChange={props.handleYearChange}
          >
            {props.yearList.map(({ value, year }) => (
              <option value={value}>{year}</option>
            ))}
          </select>
        </label>

        <label>
          Month:
          <select
            name="monthList"
            value={props.month}
            onChange={props.handleMonthChange}
          >
            {props.monthList.map(({ value, month }) => (
              <option value={value}>{month}</option>
            ))}
          </select>
        </label>

        <label>
          Day:
          <select
            name="dayList"
            value={props.day}
            onChange={props.handleDayChange}
          >
            {props.dayList.map(({ value, day }) => (
              <option value={value}>{day}</option>
            ))}
          </select>
        </label>

        <button onClick={props.handleSearch}>Search</button>
      </form>
    </div>
  );
}

export default TopPlayersSelectBox;
