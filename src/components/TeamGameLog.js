import React, { useState } from "react";

import styled from "styled-components";

const Table = styled.table`
  border: 0.2rem solid #ddd;
  color: #333;
  font-size: 1.3rem;
  margin: auto;
  margin-bottom: 6rem;
  padding; 0.8rem;
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
  padding: 0.8rem;
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
  padding: 2rem;
  text-align: center;
  white-space: nowrap;

  :first-child {
    font-weight: bold;
    letter-spacing: 0.08rem;
  }
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem auto;
`;

const HomeTeamButton = styled.button`
  background-color: ${(props) => (!props.isHomeTeam ? `#4787ff` : `white`)};
  border: 0.2rem solid #4787ff;
  border-radius: 1.5rem 0rem 0rem 1.5rem;
  color: ${(props) => (!props.isHomeTeam ? `#fffaf0` : `#4787ff`)};
  font-size: 1.1rem;
  font-weight: 800;
  padding: 0.4rem 3rem;

  :hover {
    cursor: pointer;
  }
`;

const AwayTeamButton = styled.button`
  background-color: ${(props) => (!props.isAwayTeam ? `#4787ff` : `white`)};
  border: 0.2rem solid #4787ff;
  border-radius: 0rem 1.5rem 1.5rem 0rem;
  color: ${(props) => (!props.isAwayTeam ? `#fffaf0` : `#4787ff`)};
  font-size: 1.1rem;
  font-weight: 800;
  padding: 0.4rem 3rem;

  :hover {
    cursor: pointer;
  }
`;

const HomeTeamAbbreviation = styled.span`
  font-size: 1.3rem;
`;

const AwayTeamAbbreviation = styled(HomeTeamAbbreviation)``;

function TeamGameLog(props) {
  const [isHomeTeam, setIsHomeTeam] = useState(false);
  const [isAwayTeam, setIsAwayTeam] = useState(true);

  const toggleAwayTeamGameLog = () => {
    if (!isHomeTeam) {
      setIsHomeTeam((prevState) => !prevState);
      setIsAwayTeam((prevState) => !prevState);
    }
  };

  const toggleHomeTeamGameLog = () => {
    if (!isAwayTeam) {
      setIsHomeTeam((prevState) => !prevState);
      setIsAwayTeam((prevState) => !prevState);
    }
  };

  const homeTeamLog = (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Player</TableHeader>
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
          </TableRow>
        </thead>
        <tbody>
          {props.homeTeamRoster.map((player, id) => {
            return (
              <TableRow key={id}>
                <TableData>
                  {player.player.first_name} {player.player.last_name}
                </TableData>
                <TableData>{player.min}</TableData>
                <TableData>{player.pts}</TableData>
                <TableData>{player.fga}</TableData>
                <TableData>{player.fgm}</TableData>
                <TableData>{player.fg_pct}%</TableData>
                <TableData>{player.fg3a}</TableData>
                <TableData>{player.fg3m}</TableData>
                <TableData>{player.fg3_pct}%</TableData>
                <TableData>{player.fta}</TableData>
                <TableData>{player.ftm}</TableData>
                <TableData>{player.ft_pct}%</TableData>
                <TableData>{player.reb}</TableData>
                <TableData>{player.oreb}</TableData>
                <TableData>{player.dreb}</TableData>
                <TableData>{player.ast}</TableData>
                <TableData>{player.stl}</TableData>
                <TableData>{player.blk}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );

  const awayTeamLog = (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Player</TableHeader>
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
          </TableRow>
        </thead>
        <tbody>
          {props.awayTeamRoster.map((player, id) => {
            return (
              <TableRow key={id}>
                <TableData>
                  {player.player.first_name} {player.player.last_name}
                </TableData>
                <TableData>{player.min}</TableData>
                <TableData>{player.pts}</TableData>
                <TableData>{player.fga}</TableData>
                <TableData>{player.fgm}</TableData>
                <TableData>{player.fg_pct}%</TableData>
                <TableData>{player.fg3a}</TableData>
                <TableData>{player.fg3m}</TableData>
                <TableData>{player.fg3_pct}%</TableData>
                <TableData>{player.fta}</TableData>
                <TableData>{player.ftm}</TableData>
                <TableData>{player.ft_pct}%</TableData>
                <TableData>{player.reb}</TableData>
                <TableData>{player.oreb}</TableData>
                <TableData>{player.dreb}</TableData>
                <TableData>{player.ast}</TableData>
                <TableData>{player.stl}</TableData>
                <TableData>{player.blk}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );

  const homeOrAwayTeamLog = isHomeTeam ? awayTeamLog : homeTeamLog;

  return (
    <div>
      <TeamContainer>
        <HomeTeamButton onClick={toggleHomeTeamGameLog} isHomeTeam={isHomeTeam}>
          <HomeTeamAbbreviation>{props.homeTeam}</HomeTeamAbbreviation>
        </HomeTeamButton>
        <AwayTeamButton onClick={toggleAwayTeamGameLog} isAwayTeam={isAwayTeam}>
          <AwayTeamAbbreviation>{props.awayTeam}</AwayTeamAbbreviation>
        </AwayTeamButton>
      </TeamContainer>
      {homeOrAwayTeamLog}
    </div>
  );
}

export default TeamGameLog;
