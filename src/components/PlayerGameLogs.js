import React from "react";

import styled from "styled-components";

const Table = styled.table`
  border: 1px solid #ddd;
  padding; 8px;
  text-align: left;
  margin: auto;
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
	text-align: left;
	color: black;
	padding: 8px;
`;

const TableContainer = styled.div`
	overflow-y: auto;

	@media screen and (max-width: 1024px) {
		margin-left: 17px;
		margin-right: 17px;
	}
`;

const TableData = styled.td``;

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
						.splice(0, 10)
						.map((stats, id) => {
							const gameDate = stats.game.date.split("T")[0];
							return (
								<TableRow key={id}>
									<TableData>{gameDate}</TableData>
									<TableData>{stats.team.abbreviation}</TableData>
									<TableData>{stats.game.home_team_id}</TableData>
									<TableData>{stats.min}</TableData>
									<TableData>{stats.pts}</TableData>
									<TableData>{stats.fga}</TableData>
									<TableData>{stats.fgm}</TableData>
									<TableData>{stats.fg_pct}</TableData>
									<TableData>{stats.fg3a}</TableData>
									<TableData>{stats.fg3m}</TableData>
									<TableData>{stats.fg3_pct}</TableData>
									<TableData>{stats.fta}</TableData>
									<TableData>{stats.ftm}</TableData>
									<TableData>{stats.ft_pct}</TableData>
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
