import React from "react";

import { teamHexFirstColors } from "../teamhexcolors";
import styled from "styled-components";

const Table = styled.table`
  border: 1px solid #ddd;
  font-size: 1.3rem;
  color: #333;
  margin: auto;
  margin-bottom: 5rem;
  padding; 8px;
  text-align: left;
  width: 75%;
`;

const TableRow = styled.tr`
  :nth-child(even) {
    background-color: #f2f2f2;
  }

  :hover {
    background-color: #ffff6e;
  }
`;

const TableHeader = styled.th`
  background-color: lightgray;
  color: black;
  padding: 8px;
  position: sticky;
  text-align: center;
  top: 0;
`;

const TableContainer = styled.div`
  overflow: auto;
  margin-left: 1.7rem;
  margin-right: 1.7rem;

  @media screen and (min-width: 1024px) {
    margin-left: 0rem;
    margin-right: 0rem;
  }
`;

const TableData = styled.td`
  white-space: nowrap;
  padding: 2rem;

  :first-child {
    font-weight: bold;
  }
`;

function PlayerGameLogs(props) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Date</TableHeader>
            <TableHeader>Team</TableHeader>
            <TableHeader>Opp</TableHeader>
            <TableHeader>MP</TableHeader>
            <TableHeader>PTS</TableHeader>
            <TableHeader>FGA</TableHeader>
            <TableHeader>FGM</TableHeader>
            <TableHeader>FG%</TableHeader>
            <TableHeader>FG3A</TableHeader>
            <TableHeader>FG3M</TableHeader>
            <TableHeader>FG3%</TableHeader>
            <TableHeader>FTA</TableHeader>
            <TableHeader>FTM</TableHeader>
            <TableHeader>FT%</TableHeader>
            <TableHeader>REB</TableHeader>
            <TableHeader>OREB</TableHeader>
            <TableHeader>DREB</TableHeader>
            <TableHeader>AST</TableHeader>
            <TableHeader>STL</TableHeader>
            <TableHeader>BLK</TableHeader>
            <TableHeader>TOV</TableHeader>
            <TableHeader>PF</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {props.logs
            .sort(
              (firstGame, secondGame) =>
                new Date(secondGame.game.date) - new Date(firstGame.game.date)
            )
            .map((stats, id) => {
              const gameDate = stats.game.date.split("T")[0];
              const homeTeamId = stats.game.home_team_id;
              const awayTeamId = stats.game.visitor_team_id;

              let opponentAbbreviation;
              if (stats.game.visitor_team_id === stats.team.id) {
                opponentAbbreviation = Object.keys(teamHexFirstColors)[
                  homeTeamId - 1
                ];
              } else if (stats.game.home_team_id === stats.team.id) {
                opponentAbbreviation = Object.keys(teamHexFirstColors)[
                  awayTeamId - 1
                ];
              }
              return (
                <TableRow key={id}>
                  <TableData>{gameDate}</TableData>
                  <TableData>{stats.team.abbreviation}</TableData>
                  <TableData>{opponentAbbreviation}</TableData>
                  <TableData>{stats.min}</TableData>
                  <TableData>{stats.pts}</TableData>
                  <TableData>{stats.fga}</TableData>
                  <TableData>{stats.fgm}</TableData>
                  <TableData>{stats.fg_pct}%</TableData>
                  <TableData>{stats.fg3a}</TableData>
                  <TableData>{stats.fg3m}</TableData>
                  <TableData>{stats.fg3_pct}%</TableData>
                  <TableData>{stats.fta}</TableData>
                  <TableData>{stats.ftm}</TableData>
                  <TableData>{stats.ft_pct}%</TableData>
                  <TableData>{stats.reb}</TableData>
                  <TableData>{stats.oreb}</TableData>
                  <TableData>{stats.dreb}</TableData>
                  <TableData>{stats.ast}</TableData>
                  <TableData>{stats.stl}</TableData>
                  <TableData>{stats.blk}</TableData>
                  <TableData>{stats.turnover}</TableData>
                  <TableData>{stats.pf}</TableData>
                </TableRow>
              );
            })}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default PlayerGameLogs;
