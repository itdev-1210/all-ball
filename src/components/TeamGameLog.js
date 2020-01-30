import React, { Component } from "react";

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

class TeamGameLog extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
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
							{this.props.homeTeamRoster.map((player, id) => {
								console.log(player.player);
								return (
									<TableRow key={id}>
										<TableData>
											{player.player.first_name} {player.player.last_name}
										</TableData>
										<TableData>{player.min}</TableData>
										<TableData>{player.pts}</TableData>
										<TableData>{player.fga}</TableData>
										<TableData>{player.fgm}</TableData>
										<TableData>{player.fg_pct}</TableData>
										<TableData>{player.fg3a}</TableData>
										<TableData>{player.fg3m}</TableData>
										<TableData>{player.fg3_pct}</TableData>
										<TableData>{player.fta}</TableData>
										<TableData>{player.ftm}</TableData>
										<TableData>{player.ft_pct}</TableData>
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
			</div>
		);
	}
}

export default TeamGameLog;
