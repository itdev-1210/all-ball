import React from "react";

import styled from "styled-components";

const Table = styled.table`
  border: 1px solid #ddd;
  margin: auto;
  padding; 8px;
  text-align: left;
  width: 75%;
`;

const TableRow = styled.tr`
	:nth-child(even) {
		background-color: #f2f2f2;
	}

	:hover {
		background-color: #ddd;
	}
`;

const TableHeader = styled.th`
	background-color: lightgray;
	color: black;
	padding: 8px;
	position: sticky;
	top: 0;
`;

const TableContainer = styled.div`
	height: 350px;
	overflow: auto;

	@media screen and (max-width: 1024px) {
		margin-left: 17px;
		margin-right: 17px;
	}
`;

const TableData = styled.td``;

function PlayerStats(props) {
	return (
		<TableContainer>
			<Table>
				<thead>
					<TableRow>
						<TableHeader>Season</TableHeader>
						<TableHeader>GP</TableHeader>
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
					{props.seasonStats.map((seasonStats, id) => {
						return (
							<TableRow key={id}>
								<TableData>{seasonStats.season}</TableData>
								<TableData>{seasonStats.games_played}</TableData>
								<TableData>{seasonStats.min}</TableData>
								<TableData>{seasonStats.pts}</TableData>
								<TableData>{seasonStats.fga}</TableData>
								<TableData>{seasonStats.fgm}</TableData>
								<TableData>{seasonStats.fg_pct}</TableData>
								<TableData>{seasonStats.fg3a}</TableData>
								<TableData>{seasonStats.fg3m}</TableData>
								<TableData>{seasonStats.fg3_pct}</TableData>
								<TableData>{seasonStats.fta}</TableData>
								<TableData>{seasonStats.ftm}</TableData>
								<TableData>{seasonStats.ft_pct}</TableData>
								<TableData>{seasonStats.reb}</TableData>
								<TableData>{seasonStats.oreb}</TableData>
								<TableData>{seasonStats.dreb}</TableData>
								<TableData>{seasonStats.ast}</TableData>
								<TableData>{seasonStats.stl}</TableData>
								<TableData>{seasonStats.blk}</TableData>
								<TableData>{seasonStats.turnover}</TableData>
								<TableData>{seasonStats.pf}</TableData>
							</TableRow>
						);
					})}
				</tbody>
			</Table>
		</TableContainer>
	);
}
export default PlayerStats;
