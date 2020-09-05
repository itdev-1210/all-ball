import React from "react";

import styled from "styled-components";
import { teamHexFirstColors, teamHexSecondColors } from "../teamhexcolors";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList
} from "recharts";

const Container = styled.div`
margin: 0 auto;
max-width: 1300px;
`

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  margin-bottom: 2rem;
  width: 35rem;
`;

const TeamPoints = styled.h2`
  margin-left: 1.5rem;
  font-size: 2rem;
`;

const AwayTeamContainer = styled.div`
  display: flex;
`;

const HomeTeamContainer = styled(AwayTeamContainer)``;

const HomeTeamAbbreviation = styled.h2`
  color: ${props => props.homeTeamColor};
  font-size: 2rem;
  -webkit-text-stroke-width: 0.04rem;
  -webkit-text-stroke-color: ${props => props.homeTeamSecondColor};
`;

const AwayTeamAbbreviation = styled(HomeTeamAbbreviation)`
  color: ${props => props.awayTeamColor};
  -webkit-text-stroke-color: ${props => props.awayTeamSecondColor};
`;

const ChartContainer = styled.div`
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 2rem;
`;

function TeamGameChart(props) {
  const { awayTeamRoster, homeTeamRoster, homeTeam, awayTeam } = props;

  const awayTeamPoints = awayTeamRoster.reduce((a, b) => a + b.pts, 0);
  const homeTeamPoints = homeTeamRoster.reduce((a, b) => a + b.pts, 0);

  const awayFGAttempts = awayTeamRoster.reduce((a, b) => a + b.fga, 0);
  const homeFGAttempts = homeTeamRoster.reduce((a, b) => a + b.fga, 0);

  const awayFGMade = awayTeamRoster.reduce((a, b) => a + b.fgm, 0);
  const homeFGMade = homeTeamRoster.reduce((a, b) => a + b.fgm, 0);

  const awayFGPercent = Math.round(
    (awayFGMade / awayFGAttempts).toFixed(2) * 100
  );
  const homeFGPercent = Math.round(
    (homeFGMade / homeFGAttempts).toFixed(2) * 100
  );

  const awayFG3Attempts = awayTeamRoster.reduce((a, b) => a + b.fg3a, 0);
  const homeFG3Attempts = homeTeamRoster.reduce((a, b) => a + b.fg3a, 0);

  const awayFG3Made = awayTeamRoster.reduce((a, b) => a + b.fg3m, 0);
  const homeFG3Made = homeTeamRoster.reduce((a, b) => a + b.fg3m, 0);

  const awayFG3Percent = Math.round(
    (awayFG3Made / awayFG3Attempts).toFixed(2) * 100
  );
  const homeFG3Percent = Math.round(
    (homeFG3Made / homeFG3Attempts).toFixed(2) * 100
  );

  const awayFTAttempts = awayTeamRoster.reduce((a, b) => a + b.fta, 0);
  const homeFTAttempts = homeTeamRoster.reduce((a, b) => a + b.fta, 0);

  const awayFTMade = awayTeamRoster.reduce((a, b) => a + b.ftm, 0);
  const homeFTMade = homeTeamRoster.reduce((a, b) => a + b.ftm, 0);

  const awayFTPercent = Math.round(
    (awayFTMade / awayFTAttempts).toFixed(2) * 100
  );
  const homeFTPercent = Math.round(
    (homeFTMade / homeFTAttempts).toFixed(2) * 100
  );

  const awayTeamAssists = awayTeamRoster.reduce((a, b) => a + b.ast, 0);
  const homeTeamAssists = homeTeamRoster.reduce((a, b) => a + b.ast, 0);

  const awayTeamSteals = awayTeamRoster.reduce((a, b) => a + b.stl, 0);
  const homeTeamSteals = homeTeamRoster.reduce((a, b) => a + b.stl, 0);

  const awayTeamOffRebounds = awayTeamRoster.reduce((a, b) => a + b.oreb, 0);
  const homeTeamOffRebounds = homeTeamRoster.reduce((a, b) => a + b.oreb, 0);

  const awayTeamDefRebounds = awayTeamRoster.reduce((a, b) => a + b.dreb, 0);
  const homeTeamDefRebounds = homeTeamRoster.reduce((a, b) => a + b.dreb, 0);

  const awayTeamBlocks = awayTeamRoster.reduce((a, b) => a + b.blk, 0);
  const homeTeamBlocks = homeTeamRoster.reduce((a, b) => a + b.blk, 0);

  const awayTeamTurnovers = awayTeamRoster.reduce((a, b) => a + b.turnover, 0);
  const homeTeamTurnovers = homeTeamRoster.reduce((a, b) => a + b.turnover, 0);

  const homeTeamColor = teamHexFirstColors[homeTeam];
  const awayTeamColor = teamHexFirstColors[awayTeam];

  const homeTeamSecondColor = teamHexSecondColors[homeTeam];
  const awayTeamSecondColor = teamHexSecondColors[awayTeam];

  const data = [
    {
      name: "FG %",
      [awayTeam]: awayFGPercent,
      [homeTeam]: homeFGPercent
    },
    {
      name: "FG3 %",
      [awayTeam]: awayFG3Percent,
      [homeTeam]: homeFG3Percent
    },
    {
      name: "FT %",
      [awayTeam]: awayFTPercent,
      [homeTeam]: homeFTPercent
    },
    {
      name: "Assists",
      [awayTeam]: awayTeamAssists,
      [homeTeam]: homeTeamAssists
    },
    {
      name: "Steals",
      [awayTeam]: awayTeamSteals,
      [homeTeam]: homeTeamSteals
    },
    {
      name: "OFF Rebs",
      [awayTeam]: awayTeamOffRebounds,
      [homeTeam]: homeTeamOffRebounds
    },
    {
      name: "DEF Rebs",
      [awayTeam]: awayTeamDefRebounds,
      [homeTeam]: homeTeamDefRebounds
    },
    {
      name: "Blocks",
      [awayTeam]: awayTeamBlocks,
      [homeTeam]: homeTeamBlocks
    },
    {
      name: "Turnovers",
      [awayTeam]: awayTeamTurnovers,
      [homeTeam]: homeTeamTurnovers
    }
  ];

  return (
    <Container>
      <TeamContainer>
        <AwayTeamContainer>
          <AwayTeamAbbreviation
            awayTeamColor={awayTeamColor}
            awayTeamSecondColor={awayTeamSecondColor}
          >
            {awayTeam}
          </AwayTeamAbbreviation>
          <TeamPoints>{awayTeamPoints}</TeamPoints>
        </AwayTeamContainer>
        <HomeTeamContainer>
          <HomeTeamAbbreviation
            homeTeamColor={homeTeamColor}
            homeTeamSecondColor={homeTeamSecondColor}
          >
            {homeTeam}
          </HomeTeamAbbreviation>
          <TeamPoints>{homeTeamPoints}</TeamPoints>
        </HomeTeamContainer>
      </TeamContainer>
      <ChartContainer>
        <ResponsiveContainer width="95%" height={500}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" display={"flex"} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={`${awayTeam}`}
              fill={`${awayTeamColor}`}
              stroke={`${awayTeamSecondColor}`}
              strokeWidth={3}
            >
              <LabelList dataKey={`${awayTeam}`} position="right" />
            </Bar>
            <Bar
              dataKey={`${homeTeam}`}
              fill={`${homeTeamColor}`}
              stroke={`${homeTeamSecondColor}`}
              strokeWidth={3}
            >
              <LabelList dataKey={`${homeTeam}`} position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );
}

export default TeamGameChart;
